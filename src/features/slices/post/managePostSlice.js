import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleError } from "../../api/blogger/api_blogger";
import { api_fetchPersonalPostListWithPage, api_deletePost } from "../../api/manage/api_managePost";

export const loadPersonalPostList = createAsyncThunk(
    'managePost/loadPersonalPostList',
    async ({currentPage, token}, {rejectWithValue}) => {
        let posts = await handleError(api_fetchPersonalPostListWithPage, {currentPage, token}, rejectWithValue);

        return posts.data;
    }
)

export const deletePost = createAsyncThunk(
    'managePost/deletePost',
    async({token, id}, {rejectWithValue}) => {
        let oldPost = await handleError(api_deletePost, {token, id}, rejectWithValue);

        return oldPost;
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
        errorMesssage: ""
    },
    reducers: {
        turnOffDeletePostSuccess: (state) => {
            state.deletePostSuccess = false;
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
            state.postList.data = action.payload.posts;
            state.postList.count = action.payload.count;
        })
        .addCase(loadPersonalPostList.rejected, (state, action) => {
            state.isLoadingList = false;
            state.hasErrorList = true;
            state.errorMesssage = action.payload.error;
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
            state.errorMesssage = action.payload.error;
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

export const {turnOffDeletePostSuccess} = ManagePostSlice.actions;

export default ManagePostSlice.reducer;