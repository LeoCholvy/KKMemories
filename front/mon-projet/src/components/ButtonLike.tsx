import React, {useState} from "react";

const ButtonLike: React.FC = () => {
    const [isLiked, setIsLiked] = useState(false)
    
    return (
        <button onClick={() => setIsLiked(!isLiked)}>
            {isLiked ? "Je n'aime plus" : "J'aime"}
        </button>
    );
};

export default ButtonLike;