import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { updatePost } from "../../features/slices/post/managePostSlice";
import { hasErrorDetail, isLoadingDetail, loadPostDetail, selectErrorMessage, selectPostDetail } from "../../features/slices/post/postSlice";
import { selectToken } from "../../features/slices/user/userSlice";
import PostDetailError from "../postDetail/PostDetailError";
import PostDetailLoading from "../postDetail/PostDetailLoading";
import UpdatePostForm from "./UpdatePostForm";

const UpdatePostPage = () => {
    const dispatch = useDispatch();
    let {postid} = useParams();
    let post = useSelector(selectPostDetail);
    let errorDetail = useSelector(hasErrorDetail);
    let loadingDetail = useSelector(isLoadingDetail);
    let errorMessage = useSelector(selectErrorMessage);
    let token = useSelector(selectToken);

    let updateAction = (data) => {
        dispatch(updatePost({token, id: postid, data}));
    }

    useEffect(() => {
        dispatch(loadPostDetail(postid));
    }, [])

    if(errorDetail) return <PostDetailError error={errorMessage} />;
    if(loadingDetail || Object.keys(post).length === 0) return <PostDetailLoading />;

    return(
        <div className="container custom-container">
            <UpdatePostForm post={post} submitAction={updateAction}/>
        </div>
    )
}

export default UpdatePostPage;