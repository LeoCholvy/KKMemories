import React, { JSX, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ImageBlock from "./edit/ImageBlock";
import CitationBlock from "./edit/CitationBlock";
import TextBlock from "./edit/TextBlock";
import Actions from "./edit/Actions";

// ─── Types ET Enum ───────────────────────────────────────────────

export enum BlockType {
    Text,
    Image,
    Citation,
}

interface Block {
    id: string;
    type: BlockType;
    content: string | File | null;
}

// ─── Composant Edit ───────────────────────────────────────────────

const Edit: React.FC = () => {
    const [blocks, setBlocks] = useState<Block[]>([]);
    // Pour sauvegarder le dernier bloc supprimé et sa position (pour l'annulation)
    const [lastDeleted, setLastDeleted] = useState<{ block: Block; index: number } | null>(null);

    // Fonction pour ajouter un bloc à une position donnée
    const addBlock = (blockId: number, blockType: BlockType) => {
        const newBlock: Block = {
            id: uuidv4(),
            type: blockType,
            content: blockType === BlockType.Image ? null : "",
        };
        const newBlocks = [...blocks];
        newBlocks.splice(blockId, 0, newBlock);
        setBlocks(newBlocks);
    };

    // Fonction pour mettre à jour le contenu d'un bloc
    const updateBlockContent = (id: string, newContent: string | File | null) => {
        const updatedBlocks = blocks.map((block) =>
            block.id === id ? { ...block, content: newContent } : block
        );
        setBlocks(updatedBlocks);
    };

    // Fonction pour supprimer un bloc et sauvegarder sa position pour l'annulation
    const deleteBlock = (id: string) => {
        const index = blocks.findIndex(block => block.id === id);
        if (index === -1) return;
        const deletedBlock = blocks[index];
        setLastDeleted({ block: deletedBlock, index });
        const newBlocks = [...blocks];
        newBlocks.splice(index, 1);
        setBlocks(newBlocks);
    };

    // Fonction pour annuler la suppression du dernier bloc supprimé
    const undoDelete = () => {
        if (lastDeleted) {
            const newBlocks = [...blocks];
            newBlocks.splice(lastDeleted.index, 0, lastDeleted.block);
            setBlocks(newBlocks);
            setLastDeleted(null);
        }
    };

    // Fonction de rendu d'un bloc avec le bouton de suppression au-dessus et les boutons d'ajout en dessous
    const renderBlock = (block: Block, index: number) => {
        let BlockComponent: JSX.Element | null = null;
        switch (block.type) {
            case BlockType.Text:
                BlockComponent = (
                    <TextBlock
                        content={block.content as string}
                        onChange={(newContent: string) =>
                            updateBlockContent(block.id, newContent)
                        }
                    />
                );
                break;
            case BlockType.Citation:
                BlockComponent = (
                    <CitationBlock
                        content={block.content as string}
                        onChange={(newContent: string) =>
                            updateBlockContent(block.id, newContent)
                        }
                    />
                );
                break;
            case BlockType.Image:
                BlockComponent = (
                    <ImageBlock
                        content={block.content as File | null}
                        onChange={(newContent: File | null) =>
                            updateBlockContent(block.id, newContent)
                        }
                    />
                );
                break;
            default:
                break;
        }
        return (
            <div key={block.id}>
                {/* Bouton de suppression placé au-dessus du bloc */}
                <div style={{ marginBottom: "5px" }}>
                    <button onClick={() => deleteBlock(block.id)}>
                        Supprimer le bloc
                    </button>
                </div>
                {BlockComponent}
                {/* Boutons d'ajout placés en dessous */}
                <Actions blockId={index + 1} addBlock={addBlock} />
            </div>
        );
    };

    return (
        <div style={{ padding: "20px" }}>
            {/* Bouton d'annulation en haut */}
            <div style={{ marginBottom: "10px" }}>
                <button onClick={undoDelete} disabled={!lastDeleted}>
                    Annuler la suppression
                </button>
            </div>
            {/* Bouton d'ajout en haut (sans option de suppression) */}
            <Actions blockId={0} addBlock={addBlock} />
            {blocks.map(renderBlock)}
            {/* Bouton d'annulation en bas */}
            <div style={{ marginTop: "10px" }}>
                <button onClick={undoDelete} disabled={!lastDeleted}>
                    Annuler la suppression
                </button>
            </div>
        </div>
    );
};

export default Edit;
