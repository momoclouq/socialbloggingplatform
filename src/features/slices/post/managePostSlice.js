import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleError } from "../../api/blogger/api_blogger";
import { api_fetchPersonalPostListWithPage, api_deletePost, api_createPost, api_updatePost } from "../../api/manage/api_managePost";

export const loadPersonalPostList = createAsyncThunk(
    'managePost/loadPersonalPostList',
    async ({currentPage, token}, {rejectWithValue}) => {
        let posts = await handleError(api_fetchPersonalPostListWithPage, {currentPage, token}, rejectWithValue);

        return posts;
    }
)

export const deletePost = createAsyncThunk(
    'managePost/deletePost',
    async({token, id}, {rejectWithValue}) => {
        let oldPost = await handleError(api_deletePost, {token, id}, rejectWithValue);

        return oldPost;
    }
)

export const createPost = createAsyncThunk(
    'managePost/createPost',
    async ({token, data}, {rejectWithValue}) => {
        let post = await handleError(api_createPost, {token, data}, rejectWithValue);

        return post;
    }
)

export const updatePost = createAsyncThunk(
    'managePost/updatePost',
    async ({token, id, data}, {rejectWithValue}) => {
        let post = await handleError(api_updatePost, {token, id, data}, rejectWithValue);

        return post;
    }
)

export const ManagePostSlice = createSlice({
    name: "managePost",
    initialState: {
        //postlist
        postList: {
            data: [],
            count: 0
        },
        isLoadingList: false,
        hasErrorList: false,
        //delete post
        isDeletingPost: false,
        hasErrorDeletePost: false,
        deletePostSuccess: false,
        //create post
        isCreatingPost: false,
        hasErrorCreatePost: false,
        createPostSuccess: false,
        //update post
        isUpdatingPost: false,
        hasErrorUpdatePost: false,
        updatePostSuccess: false,
        errorMessage: ""
    },
    reducers: {
        turnOffDeletePostSuccess: (state) => {
            state.deletePostSuccess = false;
        },
        turnOffCreatePostSuccess: (state) => {
            state.createPostSuccess = false;
            state.hasErrorCreatePost = false
        },
        turnOffUpdatePostSuccess: (state) => {
            state.updatePostSuccess = false;
            state.hasErrorUpdatePost = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadPersonalPostList.pending, (state) => {
            state.isLoadingList = true;
            state.hasErrorList = false;
        })
        .addCase(loadPersonalPostList.fulfilled, (state, action) => {
            state.isLoadingList = false;
            state.hasErrorList = false;
            state.postList.data = action.payload.data.posts;
            state.postList.count = action.payload.data.count;
        })
        .addCase(loadPersonalPostList.rejected, (state, action) => {
            state.isLoadingList = false;
            state.hasErrorList = true;
            console.log(action.payload.error);
            state.errorMessage = action.payload.error;
        })
        .addCase(deletePost.pending, (state) => {
            state.isDeletingPost = true;
            state.hasErrorDeletePost = false;
        })
        .addCase(deletePost.fulfilled, (state) => {
            state.isDeletingPost = false;
            state.hasErrorDeletePost = false;
            state.deletePostSuccess = true;
        })
        .addCase(deletePost.rejected, (state, action) => {
            state.isDeletingPost = false;
            state.hasErrorDeletePost = true;
            state.errorMessage = action.payload.error;
        })
        .addCase(createPost.pending, (state) => {
            state.isCreatingPost = true;
            state.hasErrorCreatePost = false;
            state.createPostSuccess = false;
        })
        .addCase(createPost.fulfilled, (state, action) => {
            state.isCreatingPost = false;
            state.hasErrorCreatePost = false;
            state.createPostSuccess = true;
            console.log(action.payload);
        })
        .addCase(createPost.rejected, (state, action) => {
            state.isCreatingPost = false;
            state.hasErrorCreatePost = true;
            state.createPostSuccess = false;
            state.errorMessage = action.payload.error[0].msg;
            console.log(action.payload.error[0].msg);
        })
        .addCase(updatePost.pending, (state) => {
            state.isUpdatingPost = true;
            state.hasErrorUpdatePost = false;
            state.updatePostSuccess = false;
        })
        .addCase(updatePost.fulfilled, (state) => {
            state.isUpdatingPost = false;
            state.hasErrorUpdatePost = false;
            state.updatePostSuccess = true;
        })
        .addCase(updatePost.rejected, (state, action) => {
            state.isUpdatingPost = false;
            state.hasErrorUpdatePost = true;
            state.updatePostSuccess = false;
            state.errorMessage = action.payload.error[0].msg;
        })
    }
})

export const selectErrorMessage = (state) => state.managePost.errorMessage;

export const hasErrorList = (state) => state.managePost.hasErrorList;
export const isLoadingList = (state) => state.managePost.isLoadingList;
export const selectPostList = (state) => state.managePost.postList;

export const hasErrorDeletePost = (state) => state.managePost.hasErrorDeletePost;
export const isDeletingPost = (state) => state.managePost.isDeletingPost;
export const selectDeletePostSuccess = (state) => state.managePost.deletePostSuccess;

export const hasErrorCreatePost = (state) => state.managePost.hasErrorCreatePost;
export const isCreatingPost = (state) => state.managePost.isCreatingPost;
export const selectCreatePostSuccess = (state) => state.managePost.createPostSuccess;

export const hasErrorUpdatePost = (state) => state.managePost.hasErrorUpdatePost;
export const isUpdatingPost = (state) => state.managePost.isUpdatingPost;
export const selectUpdatePostSuccess = (state) => state.managePost.updatePostSuccess;

export const {turnOffDeletePostSuccess, turnOffCreatePostSuccess,  turnOffUpdatePostSuccess} = ManagePostSlice.actions;

export default ManagePostSlice.reducer;