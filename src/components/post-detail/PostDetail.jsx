import { useEffect, useRef } from "react";
import Timeformatted from "../timeformat/Timeformatted";

const PostDetail = ({post}) => {
    const block = useRef(null);

    useEffect(() => {
        block.current.innerHTML = post.content;
    }, [post])

    return(
        <div className="container custom-container">
            <div className="content pt-4">
                <div className="title is-size-2">{post.title}</div>
                <div className="subtitle">{post.subtitle}</div>
                <div className="has-text-weight-light block is-flex is-justify-content-space-between">
                    <p>Author: {post.author.username}</p>
                    <div className="is-flex is-flex-direction-column is-align-items-flex-end">
                        <div>View: {post.view}</div>
                        <div>Added: <Timeformatted timeString={post.date_created}/></div>
                    </div>
                </div>
                <hr />
                <div className="block" ref={block}></div>
                <hr />
            </div>
        </div>
    )
}

export default PostDetail;