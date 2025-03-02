import React from "react";
import Avatar from "./Avatar";
import ButtonLike from "./ButtonLike";

// Créer des énumérations pour les couleurs et les types de citation
enum CitationColor {
    Orange = "orange",
    White = "white",
    Black = "black",
}
enum CitationType {
    Default = "default",
    Bordered = "bordered",
}

export { CitationColor, CitationType };

// Créer une interface pour les props de Citation
interface CitationProps {
    color?: string;
    type?: CitationType;
}


// Créer un composant Citation qui affiche une citation
const Citation: React.FC<CitationProps> = ({ color = CitationColor.Orange, type = CitationType.Default }) => {

    // Appliquer des styles en fonction de la couleur et du type
    const cardStyle = {
        backgroundColor: color,
        border: type === CitationType.Bordered ? "2px solid #ccc" : "none",
        padding: "20px",
        borderRadius: "8px",
    };

    // Il faut deux type de citations, les grandes et les petites, (il faut changer les énumérations)
    return (
        <div style={cardStyle}>
            <Avatar />
            <h1>Histoire de :</h1>
            <h3>@leocholvy</h3>
            <blockquote>
                <p>Je suis un développeur web passionné par les nouvelles technologies et les jeux vidéo.</p>
            </blockquote>
            <ButtonLike />
        </div>
    );
};

export default Citation;
