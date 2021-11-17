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
import { isAuthenticated, selectUser } from "../../features/slices/user/userSlice";
import DeletePostModal from "../../components/modals/post_related/DeletePostModal";
import { useState } from "react";
import { selectDeletePostSuccess, turnOffDeletePostSuccess } from "../../features/slices/post/managePostSlice";
import { Link } from "react-router-dom";

const PostDetailPage = () => {
    let dispatch = useDispatch();
    let { postid } = useParams();
    let post = useSelector(selectPostDetail);
    let errorDetail = useSelector(hasErrorDetail);
    let loadingDetail = useSelector(isLoadingDetail);
    let errorMessage = useSelector(selectErrorMessage);
    const deletePostSuccess = useSelector(selectDeletePostSuccess);

    const authenticated = useSelector(isAuthenticated);
    const user = useSelector(selectUser);

    //delete post modal
    const [displayDelete, setDisplayDelete] = useState(false);

    let optionsPanel = () => {
        if(authenticated && post.author._id === user._id){ 
            return(
            <div className="box mt-2 p-2 container custom-container is-flex has-background-grey-light">
                <Link to={`/manage/post/update/${postid}`}><button className="button mr-2 is-primary">Update post</button></Link>
                <button onClick={() => {setDisplayDelete(true)}} className="button is-danger">Delete post</button>
            </div>
        )} else {
            return "";
        }
    }

    useEffect(() => {
        dispatch(loadPostDetail(postid));
    }, [])

    useEffect(() => {
        if(deletePostSuccess) {
            dispatch(turnOffDeletePostSuccess());
        }
    }, [deletePostSuccess]);

    if(errorDetail) return <PostDetailError error={errorMessage} />;
    if(loadingDetail || Object.keys(post).length === 0) return <PostDetailLoading />;
    
    return(
        <div className="container is-fluid">
            {optionsPanel()}
            <DeletePostModal state={displayDelete} actionClose={() => {setDisplayDelete(false)}} id={postid} />

            <PostDetail post={post}/>
            <PostComments postid={postid}/>
            <CreateCommentForm postid={postid} />
        </div>
    )
}

export default PostDetailPage;