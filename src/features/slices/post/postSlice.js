import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleError } from "../../api/blogger/api_blogger";
import { api_fetchPublishedPostDetailWithId, api_fetchPublishedPostListWithPage } from "../../api/post/api_post";

export const loadPostList = createAsyncThunk(
    'post/loadPostList',
    async ({currentPage, mode}, { rejectWithValue }) => {
        let posts = await handleError(api_fetchPublishedPostListWithPage, {currentPage, mode}, rejectWithValue);

        return posts.data;
    }
)

export const loadPostDetail = createAsyncThunk(
    'post/loadPostDetail',
    async (id, {rejectWithValue}) => {
        let post = await handleError(api_fetchPublishedPostDetailWithId, {id}, rejectWithValue);

        return post.data;
    }
)

export const postSlice = createSlice({
    name: "post",
    initialState: {
        postList: {
            data: [],
            count: 0
        },
        postDetail: {},
        isLoadingList: false,
        hasErrorList: false,
        isLoadingDetail: false,
        hasErrorDetail: false,
        errorMessage: ""
    },
    extraReducers: (builder) => {
        builder.addCase(loadPostList.pending, (state) => {
            state.isLoadingList = true;
            state.hasErrorList = false;
        })
        .addCase(loadPostList.fulfilled, (state, action) => {
            state.isLoadingList = false;
            state.hasErrorList = false;
            state.postList.data = action.payload.posts;
            state.postList.count = action.payload.count;
        })
        .addCase(loadPostList.rejected, (state, action) => {
            state.isLoadingList = false;
            state.hasErrorList = false;
            state.errorMessage = action.payload.error;
        })
        .addCase(loadPostDetail.pending, (state) => {
            state.isLoadingDetail = true;
            state.hasErrorDetail = false;
        })
        .addCase(loadPostDetail.fulfilled, (state, action) => {
            state.isLoadingDetail = false;
            state.hasErrorDetail = false;
            state.postDetail = action.payload.post;
        })
        .addCase(loadPostDetail.rejected, (state, action) => {
            state.isLoadingDetail = false;
            state.hasErrorDetail = true;
            state.errorMessage = action.payload.error;
        })
    }
})

export const selectErrorMessage = (state) => state.post.errorMessage;

export const hasErrorList = (state) => state.post.hasErrorList;
export const isLoadingList = (state) => state.post.isLoadingList;
export const selectPostList = (state) => state.post.postList;

export const hasErrorDetail = (state) => state.post.hasErrorDetail;
export const isLoadingDetail = (state) => state.post.isLoadingDetail;
export const selectPostDetail = (state) => state.post.postDetail;

export default postSlice.reducer;