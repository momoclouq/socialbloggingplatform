import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api_fetchBloggerListWithPageAndMode, api_fetchBloggerWithDetail, api_heartBloggerWithId, handleError } from "../../api/blogger/api_blogger";

export const loadBloggerList = createAsyncThunk(
    'blogger/loadBloggerList',
    async ({currentPage, mode}, { rejectWithValue }) => {
        let bloggers = await handleError(api_fetchBloggerListWithPageAndMode, {currentPage, mode}, rejectWithValue);

        return bloggers;
    }
)

export const loadBloggerDetail = createAsyncThunk(
    'blogger/loadBloggerDetail',
    async (id, {rejectWithValue}) => {
        let blogger = await handleError(api_fetchBloggerWithDetail, {id}, rejectWithValue);

        return blogger;
    }
)

export const heartBlogger = createAsyncThunk(
    'blogger/heartBlogger',
    async (id, rejectWithValue) => {
        let blogger = await handleError(api_heartBloggerWithId, {id}, rejectWithValue);

        return blogger;
    }
)

export const bloggerSlice = createSlice({
    name: 'blogger',
    initialState: {
        bloggerList: {
            data: [],
            count: 0
        },
        bloggerDetail: {},
        isLoadingList: false,
        hasErrorList: false,
        isLoadingDetail: false,
        hasErrorDetail: false,
        errorMessage: ""
    },
    extraReducers: (builder) => {
        builder.addCase(loadBloggerList.pending, (state) => {
            state.isLoadingList = true;
            state.hasErrorList = false;
        })
        .addCase(loadBloggerList.fulfilled, (state, action) => {
            state.isLoadingList = false;
            state.hasErrorList = false;
            state.bloggerList.data = action.payload.data.bloggers;
            state.bloggerList.count = action.payload.data.count;
        })
        .addCase(loadBloggerList.rejected, (state, action) => {
            state.isLoadingList = false;
            state.hasErrorList = true;
            state.errorMessage = action.payload.error;
        })
        .addCase(loadBloggerDetail.pending, (state) => {
            state.isLoadingDetail = true;
            state.hasErrorDetail = false;
        })
        .addCase(loadBloggerDetail.fulfilled, (state, action) => {
            state.isLoadingDetail = false;
            state.hasErrorDetail = false;
            state.bloggerDetail = action.payload.blogger;
        })
        .addCase(loadBloggerDetail.rejected, (state, action) => {
            state.isLoadingDetail = false;
            state.hasErrorDetail = true;
            state.errorMessage = action.payload;
        })
        .addCase(heartBlogger.fulfilled, (state, action) => {
            if(!state.bloggerDetail.heart) state.bloggerDetail.heart = 1;
            else state.bloggerDetail.heart += 1;
        })
    }
})

export const selectErrorMessage = (state) => state.blogger.errorMessage;

export const hasErrorList = (state) => state.blogger.hasErrorList;
export const isLoadingList = (state) => state.blogger.isLoadingList;
export const selectBloggerList = (state) => state.blogger.bloggerList;

export const hasErrorDetail = (state) => state.blogger.hasErrorDetail;
export const isLoadingDetail = (state) => state.blogger.isLoadingDetail;
export const selectBloggerDetail = (state) => state.blogger.bloggerDetail;

export default bloggerSlice.reducer;
