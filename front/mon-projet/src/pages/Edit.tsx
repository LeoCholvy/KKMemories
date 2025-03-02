import React, {useState} from "react";
import Actions from "./edit/Actions.tsx";

enum BlockType {
    Text,
    Image,
    Citation,
}
export { BlockType };

const Edit = () => {
    const [blocks, setBlocks] = useState([]);

    const addBlock = (blockId: number, blockType: BlockType) => {
        setBlocks([...blocks, { blockId, blockType }]);
    }

    return (
        <div>
            <Actions blockId={0} addBlock={addBlock} />
            <p>{JSON.stringify(blocks, null, 2)}</p>
        </div>
    );
};

export default Edit;