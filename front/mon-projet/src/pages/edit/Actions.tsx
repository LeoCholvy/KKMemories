import React from 'react';
import {BlockType} from "../Edit.tsx";

interface ActionsProps {
    blockId: number;
    addBlock: (blockId: number, blockType: BlockType) => void;
    deleteBlock ? : (blockId: number) => void | null;
}

const Actions: React.FC<ActionsProps> = ({ blockId, addBlock, deleteBlock = null }) => {
    const styles = {
        boder: '1px solid black',
    }

    return (
        <div style={styles}>
            <button onClick={() => addBlock(blockId, BlockType.Text)}>Ajouter un bloc de texte</button>
            <button onClick={() => addBlock(blockId, BlockType.Image)}>Ajouter un bloc d'image</button>
            <button onClick={() => addBlock(blockId, BlockType.Citation)}>Ajouter un bloc de citation</button>
            {deleteBlock !== null && <button onClick={() => deleteBlock(blockId)}>Supprimer le bloc</button>}
        </div>
    );
}

export default Actions;