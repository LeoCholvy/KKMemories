import React from "react";

interface TextBlockProps {
    content: string;
    onChange: (newContent: string) => void;
}

const TextBlock: React.FC<TextBlockProps> = ({ content, onChange }) => (
    <div style={{ marginBottom: "10px" }}>
    <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tapez votre texte ici..."
        style={{ width: "100%", height: "100px" }}
    />
    </div>
);

export default TextBlock;