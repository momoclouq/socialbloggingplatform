import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { hasErrorList, isLoadingList, loadCommentList, selectCommentList, selectErrorMessage } from "../../../features/slices/comment/commentSlice";
import CommentCard from "../../../components/post-comments/CommentCard";
import PostCommentError from "./PostCommentError";
import PostCommentLoading from "./PostCommentLoading";

const PostComments = ({postid}) => {
    const dispatch = useDispatch();
    const comments = useSelector(selectCommentList);
    const error = useSelector(selectErrorMessage);
    const loadingList = useSelector(isLoadingList);
    const errorList = useSelector(hasErrorList);

    useEffect(() => {
        dispatch(loadCommentList(postid));
    }, [])

    if(errorList) return <PostCommentError error={error} />;
    if(loadingList) return <PostCommentLoading />

    return(
        <div className="container mt-5">
            <div className="subtitle is-uppercase"><strong>Comments</strong></div>
            {
                comments.data.map((comment, index) => {
                    if(comment == null) return "";
                    return <CommentCard comment={comment} key={index} />
                })
            }
        </div>
    )
}

export default PostComments;