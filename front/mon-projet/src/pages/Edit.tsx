import React, {useState} from "react";
import Actions from "./edit/Actions.tsx";
import TextBlock from "./edit/TextBlock.tsx";
import CitationBlock from "./edit/CitationBlock.tsx";
import ImageBlock from "./edit/ImageBlock.tsx";

enum BlockType {
    Text,
    Image,
    Citation,
}
export { BlockType };

const Edit:React.FC = () => {
    const [blocks, setBlocks] = useState([]);

    const addBlock = (blockId: number, blockType: BlockType) => {
        let newBlocks = [...blocks];
        switch (blockType) {
            case BlockType.Text:
                newBlocks.splice(blockId, 0, <TextBlock />);
                break;
            case BlockType.Image:
                newBlocks.splice(blockId, 0, <ImageBlock />);
                break;
            case BlockType.Citation:
                newBlocks.splice(blockId, 0, <CitationBlock />);
                break;
        }
        setBlocks(newBlocks);
    };

    return (
        <div>
            <Actions blockId={0} addBlock={addBlock} />
            {
                blocks.map((block, index) => {
                    return (
                        <>
                            {block}
                            <Actions blockId={index + 1} addBlock={addBlock} />
                        </>
                    );
                })
            }
        </div>
    );
};

export default Edit;