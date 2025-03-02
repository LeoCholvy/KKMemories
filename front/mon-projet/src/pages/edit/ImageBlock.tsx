import React, { useState, useEffect } from "react";

interface ImageBlockProps {
    content: File | null;
    onChange: (newContent: File | null) => void;
}

const ImageBlock: React.FC<ImageBlockProps> = ({ content, onChange }) => {
    const [preview, setPreview] = useState<string>("");

    useEffect(() => {
        if (content) {
            const objectUrl = URL.createObjectURL(content);
            setPreview(objectUrl);

            // Nettoyage de l'URL lorsque le composant se démonte ou que l'image change
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setPreview("");
        }
    }, [content]);

    return (
        <div style={{ marginBottom: "10px" }}>
            {preview ? (
                <img src={preview} alt="Bloc image" style={{ maxWidth: "100%" }} />
            ) : (
                <p>Aucune image sélectionnée</p>
            )}
            <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                        onChange(e.target.files[0]);
                    } else {
                        onChange(null);
                    }
                }}
                style={{ width: "100%" }}
            />
        </div>
    );
};

export default ImageBlock;
