import React from "react";

interface CitationBlockProps {
    content: string;
    onChange: (newContent: string) => void;
}

const CitationBlock: React.FC<CitationBlockProps> = ({ content, onChange }) => (
    <div
        style={{
            marginBottom: "10px",
            borderLeft: "4px solid red",
            paddingLeft: "8px",
        }}
    >
    <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tapez votre citation ici..."
        style={{ width: "100%", height: "80px" }}
    />
    </div>
);

export default CitationBlock;