import { useState } from "react";

const CommentButton = ({actionOnClick}) => {
    const hoverEffect = () => {
        setContent("Post a new comment");
    } 

    const outHoverEffect = () => {
        setContent(defaultVar)
    }

    const defaultVar = <i className="fas fa-plus"></i>;
    const [content, setContent] = useState(defaultVar);

    return(
        <button onClick={actionOnClick} onMouseOver={hoverEffect} onMouseLeave={outHoverEffect} className="button is-success is-light is-medium is-outlined is-rounded">
            {content}
        </button>
    )
}

export default CommentButton;