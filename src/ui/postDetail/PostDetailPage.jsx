import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import PostComments from "./commentSection/PostComments";
import PostDetail from "../../components/post-detail/PostDetail";
import { hasErrorDetail, isLoadingDetail, loadPostDetail, selectErrorMessage, selectPostDetail } from "../../features/slices/post/postSlice";
import PostDetailError from "./PostDetailError";
import PostDetailLoading from "./PostDetailLoading";
import CreateCommentForm from "./commentSection/CreateCommentForm";

const PostDetailPage = () => {
    let dispatch = useDispatch();
    let { postid } = useParams();
    let post = useSelector(selectPostDetail);
    let errorDetail = useSelector(hasErrorDetail);
    let loadingDetail = useSelector(isLoadingDetail);
    let errorMessage = useSelector(selectErrorMessage);

    useEffect(() => {
        dispatch(loadPostDetail(postid));
    }, [])

    if(loadingDetail || Object.keys(post).length === 0) return <PostDetailLoading />;
    if(errorDetail) return <PostDetailError error={errorMessage} />;

    return(
        <div className="container is-fluid">
            <PostDetail post={post}/>
            <PostComments postid={postid}/>
            <CreateCommentForm postid={postid} />
        </div>
    )
}

export default PostDetailPage;