import os
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.trustedhost import TrustedHostMiddleware
from starlette.middleware.httpsredirect import HTTPSRedirectMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from sqlalchemy.exc import SQLAlchemyError

# -------------------------------
# Configuration de la base de données
# -------------------------------

# Pour cet exemple, on utilise SQLite, mais vous pouvez adapter DATABASE_URL pour PostgreSQL, MySQL, etc.
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")

# Pour SQLite, on doit spécifier l'argument "check_same_thread"
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Modèle SQLAlchemy
class User(Base):
    """
    Modèle de base de données pour les utilisateurs.
    """
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)

# Création des tables dans la base (si elles n'existent pas déjà)
Base.metadata.create_all(bind=engine)

# -------------------------------
# Schémas Pydantic
# -------------------------------

class UserCreate(BaseModel):
    """
    Schéma Pydantic pour la création d'un utilisateur.
    """
    username: str
    email: str

class UserResponse(BaseModel):
    """
    Schéma Pydantic pour la réponse utilisateur.
    """
    id: int
    username: str
    email: str

    # Permet à Pydantic de lire les données ORM
    class Config:
        orm_mode = True

# -------------------------------
# Création de l'application FastAPI
# -------------------------------

app = FastAPI(
    title="API Sécurisée avec FastAPI, SQLAlchemy et Pydantic"
)

# -------------------------------
# Ajout des Middlewares de Sécurité
# -------------------------------

# Middleware CORS : autorise toutes les origines en développement.
# En production, remplacez ["*"] par la liste des domaines autorisés.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Middleware TrustedHost : limite les requêtes aux hôtes de confiance.
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["localhost", "127.0.0.1", "*.votredomaine.com"]
)

# Middleware HTTPSRedirect : redirige les requêtes HTTP vers HTTPS.
# Généralement activé en production. Ici, on l'active si la variable ENVIRONMENT vaut "production".
if os.getenv("ENVIRONMENT") == "production":
    app.add_middleware(HTTPSRedirectMiddleware)

# -------------------------------
# Dépendance pour la session de base de données
# -------------------------------

def get_db():
    """
    Dépendance pour obtenir une session de base de données.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# -------------------------------
# Routes de l'API
# -------------------------------

@app.get("/", tags=["Root"])
async def read_root():
    """
    Point d'entrée de l'API.
    """
    return {"message": "Bienvenue sur l'API sécurisée !"}

@app.post("/users", response_model=UserResponse, tags=["Utilisateurs"])
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    """
    Crée un nouvel utilisateur.
    Vérifie si le nom d'utilisateur existe déjà pour éviter les doublons.

    Args:
        user (UserCreate): Les informations de l'utilisateur à créer.
        db (Session): La session de base de données.

    Returns:
        UserResponse: Les informations de l'utilisateur créé.

    Raises:
        HTTPException: Si le nom d'utilisateur existe déjà ou en cas d'erreur de base de données.
    """
    # Recherche un utilisateur existant avec le même username
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Nom d'utilisateur déjà existant.")

    new_user = User(username=user.username, email=user.email)
    db.add(new_user)
    try:
        db.commit()
        db.refresh(new_user)
    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(status_code=500, detail="Erreur lors de l'ajout de l'utilisateur.")

    return new_user

@app.get("/users/{user_id}", response_model=UserResponse, tags=["Utilisateurs"])
async def get_user(user_id: int, db: Session = Depends(get_db)):
    """
    Récupère un utilisateur par son identifiant.

    Args:
        user_id (int): L'identifiant de l'utilisateur à récupérer.
        db (Session): La session de base de données.

    Returns:
        UserResponse: Les informations de l'utilisateur récupéré.

    Raises:
        HTTPException: Si l'utilisateur n'est pas trouvé.
    """
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé.")
    return user

@app.get("/baguette", tags=["Divers"])
async def baguette():
    """
    Exemple d'une route spécifique.
    """
    return {"message": "Vous n'êtes pas censé être ici !!"}

# -------------------------------
# Point d'entrée pour exécuter l'application
# -------------------------------

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)