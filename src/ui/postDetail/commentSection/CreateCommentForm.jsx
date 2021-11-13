import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentButton from "../../../components/comment-buttom/CommentButtom";
import CommentForm from "../../../components/comment-form/CommentForm";
import ErrorPage from "../../../components/mock-pages/error/ErrorPage";
import LoadingPage from "../../../components/mock-pages/loading/LoadingPage";
import { hasErrorCreating, isCreatingComment, loadCommentList, postComment, selectErrorMessage } from "../../../features/slices/comment/commentSlice";

const CreateCommentForm = ({postid}) => {
    const dispatch = useDispatch();
    const [openForm, setOpenForm] = useState(false);
    const errorCreating = useSelector(hasErrorCreating);
    const errorMessage = useSelector(selectErrorMessage);
    const creatingComment = useSelector(isCreatingComment);

    const reloadList = () => {
        dispatch(loadCommentList(postid));
    }

    const open = () => {
        setOpenForm(true);
    }

    const close = () => {
        setOpenForm(false);
    }

    if(errorCreating) return <ErrorPage title="Cannot create comment" error={errorMessage} />;
    if(creatingComment) return <LoadingPage message="Posting comment, please wait" />

    return(
        <div className="is-flex is-flex-direction-column is-align-items-center mt-5">
            {
                openForm ? <CommentForm postid={postid} actionOnClick={close} submitAction={postComment} additionalActions={[reloadList]}/> : <div><CommentButton actionOnClick={open} /></div>
            }
        </div>
    )
}

export default CreateCommentForm;