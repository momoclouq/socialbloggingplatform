import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
 import { deletePost, hasErrorDeletePost, isDeletingPost, selectDeletePostSuccess, selectErrorMessage } from "../../../features/slices/post/managePostSlice";
import { selectToken } from "../../../features/slices/user/userSlice";
import NormalLoader from "../../loader/NormalLoader";
import ErrorMessage from "../../typo/error-message/ErrorMessage";

const DeletePostModal = ({state, actionClose, id}) => {
    const dispatch = useDispatch();
    const deletingPost = useSelector(isDeletingPost);
    const errorDeletingPost = useSelector(hasErrorDeletePost);
    const error = useSelector(selectErrorMessage);
    const token = useSelector(selectToken);
    const deletePostSuccess = useSelector(selectDeletePostSuccess);

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(deletePost({token, id}));
    }

    if(deletePostSuccess) return <Redirect to="/manage/post" />;

    return(
        <div className={`modal ${state ? "is-active" : ""}`}>
            <div onClick={actionClose} className="modal-background"></div>
            <div className="modal-content">
                <form className="box" onSubmit={handleSubmit}>
                    {
                        deletingPost ? <NormalLoader message="Deleting the post" /> : ""
                    }
                    {
                        errorDeletingPost ? <ErrorMessage error={error} /> : ""
                    }
                    <div className="title">Are you sure that you want to delete your post?</div>

                    <div className="is-flex is-justify-content-space-between">
                        <div className="control">
                            <button onClick={actionClose} className="button is-dark">Cancel</button>
                        </div>
                        <div className="control">
                            <button type="submit" className="button is-danger">Delete post</button>
                        </div>
                    </div>
                </form>
            </div>
            <button onClick={actionClose} className="modal-close is-large" aria-label="close"></button>
        </div>
    )
}

export default DeletePostModal;