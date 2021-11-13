import { configureStore } from "@reduxjs/toolkit";
import bloggerReducer from "../features/slices/blogger/bloggerSlice";
import postReducer from "../features/slices/post/postSlice";
import commentReducer from "../features/slices/comment/commentSlice";
import userReducer from "../features/slices/user/userSlice";

const store = configureStore({
    reducer: {
        blogger: bloggerReducer,
        post: postReducer,
        comment: commentReducer,
        user: userReducer
    }
})

export default store;