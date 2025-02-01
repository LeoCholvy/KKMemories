Command pour entrer dans l'environnement virtuel:
Il faut se placer dans ./fastapi
```
./.venv/Scripts/Activate.ps1
```

Command à effectuer une fois dans l'environnement viruel:
```
pip install -r requirements.txt
```

Command pour lancer le serveur:
```
fastapi dev main.py
```

On peut aussi juste lancer main.py, cela lancera le server avec uvicorn (https et tout, server de prod potentiellement)
