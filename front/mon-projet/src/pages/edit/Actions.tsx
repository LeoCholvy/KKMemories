import React from 'react';
import { BlockType } from "../Edit";

interface ActionsProps {
    blockId: number;
    addBlock: (blockId: number, blockType: BlockType) => void;
}

const Actions: React.FC<ActionsProps> = ({ blockId, addBlock }) => {
    const styles = {
        border: '1px solid black',
        padding: "5px",
        margin: "5px 0"
    };

    return (
        <div style={styles}>
            <button onClick={() => addBlock(blockId, BlockType.Text)}>
                Ajouter un bloc de texte
            </button>
            <button onClick={() => addBlock(blockId, BlockType.Image)}>
                Ajouter un bloc d'image
            </button>
            <button onClick={() => addBlock(blockId, BlockType.Citation)}>
                Ajouter un bloc de citation
            </button>
        </div>
    );
};

export default Actions;
