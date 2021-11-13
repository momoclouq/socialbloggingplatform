import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectSuccessMessage } from "../../features/slices/comment/commentSlice";

const CommentForm = ({postid, actionOnClick, submitAction, additionalActions}) => {
    const dispatch = useDispatch();
    const successMessage = useSelector(selectSuccessMessage);


    const handleSubmit = (event) => {
        event.preventDefault();
        let author = event.target.author.value;
        let content = event.target.content.value;

        dispatch(submitAction({postid, author, content}));
        for(let i = 0; i < additionalActions.length; i++){
            additionalActions[i]();
        }
    }

    return (
        <div className="login-form-menu">
            {
                successMessage ? <div className="block">{successMessage}</div> : ""
            }
            <form className="box has-background-light p-4" onSubmit={handleSubmit}>
                <div className="is-flex is-justify-content-space-between mb-3">
                    <div className="subtitle mb-0">Comment your thought</div>
                    <button onClick={actionOnClick} className="delete"></button>
                </div>
                <div className="field">
                    <div className="control">
                        <input className="input is-success" name="author" type="text" placeholder="username" />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <input className="input is-success" name="content" type="text" placeholder="comment content" />
                    </div>
                </div>

                <div className="is-flex is-justify-content-flex-end">
                    <button type="submit" className="button is-success">Post Comment</button>
                </div>
            </form>
        </div>
    )
}

export default CommentForm;