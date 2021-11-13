import Timeformatted from "../timeformat/Timeformatted";

const CommentCard = ({comment}) => {
    return(
        <div className="box">
            <div className="is-flex is-justify-content-space-between">
                <div className="is-size-5 has-text-link">{comment.author}</div>
                <div className="has-text-grey is-size-7"><Timeformatted timeString={comment.date_created} /></div>
            </div>
            <div>
                <p>{comment.content}</p>
            </div>
        </div>
    )
}

export default CommentCard;