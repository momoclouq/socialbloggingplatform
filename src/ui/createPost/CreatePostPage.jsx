import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ReturnButton from "../../components/buttons/return/ReturnBtn";
import NormalLoader from "../../components/loader/NormalLoader";
import ErrorMessage from "../../components/typo/error-message/ErrorMessage";
import { createPost, hasErrorCreatePost, isCreatingPost, selectCreatePostSuccess, selectErrorMessage, turnOffCreatePostSuccess } from "../../features/slices/post/managePostSlice";
import { selectToken } from "../../features/slices/user/userSlice";
import CreatePostForm from "./CreatePostForm";

const CreatePostPage = () => {
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const creatingPost = useSelector(isCreatingPost);
    const errorCreatePost = useSelector(hasErrorCreatePost);
    const errorMessage = useSelector(selectErrorMessage);
    const createPostSuccessState = useSelector(selectCreatePostSuccess);

    const createAction = (data) => {
        dispatch(createPost({token, data}));
    }

    useEffect(() => {
        if(createPostSuccessState){
            setTimeout(() => {dispatch(turnOffCreatePostSuccess())}, 2000);
        }
    }, [createPostSuccessState])

    console.log(errorMessage);

    return(
        <div className="container custom-container pt-3">
            {
                creatingPost ? <NormalLoader message="Creating post"/> : ""
            }
            {
                errorCreatePost ? <ErrorMessage error={errorMessage} /> : ""
            }
            {
                createPostSuccessState ? <div className="box has-background-success">Post created</div> : ""
            }
            <div className="mt-3">
                <ReturnButton to="/manage/post" />
                <span className="ml-3 title">Create a new post</span>
            </div>
            <CreatePostForm submitAction={createAction}/>
        </div>
    )
}

export default CreatePostPage;