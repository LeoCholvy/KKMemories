import React from "react";

const CitationBlock: React.FC = () => {

    const style: React.CSSProperties = {
        border: "2px solid red",
        boxSizing: "border-box",
    }

    return <textarea style={style} placeholder={"Ecrivez votre citation ici"} />;
}

export default CitationBlock;