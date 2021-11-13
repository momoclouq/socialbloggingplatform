import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleError } from "../../api/blogger/api_blogger";
import { api_createCommentWithData, api_fetchAllCommentsWithIdsList } from "../../api/comment/api_comment";

export const loadCommentList = createAsyncThunk(
    'comment/loadCommentList',
    async (postid, {rejectWithValue}) => {
        let comments = await handleError(api_fetchAllCommentsWithIdsList, {postid}, rejectWithValue);

        return comments;
    }
)

export const postComment = createAsyncThunk(
    'comment/postComment',
    async ({postid, author, content}, {rejectWithValue}) => {
        console.log(postid);
        let comment = await handleError(api_createCommentWithData, {postid, author, content}, rejectWithValue);

        return comment;
    }
)

export const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        commentList: {
            data: [],
            count: 0
        },
        isLoadingList: false,
        hasErrorList: false,
        isCreatingComment: false,
        hasErrorCreating: false,
        errorMessage: "",
        successMessage: ""
    },
    extraReducers: (builder) => {
        builder.addCase(loadCommentList.pending, (state) => {
            state.isLoadingList = true;
            state.hasErrorList = false;
        })
        .addCase(loadCommentList.fulfilled, (state, action) => {
            state.isLoadingList = false;
            state.hasErrorList = false;
            state.commentList.data = action.payload.data.comments;
            state.commentList.count = action.payload.data.count;
        })
        .addCase(loadCommentList.rejected, (state, action) => {
            state.isLoadingList = false;
            state.hasErrorList = true;
            state.errorMessage = action.payload.error;
        })
        .addCase(postComment.pending, (state) => {
            state.isCreatingComment = true;
            state.hasErrorCreating = false;
        })
        .addCase(postComment.fulfilled, (state, action) => {
            state.isCreatingComment = false;
            state.hasErrorCreating = false;
            state.successMessage = "Comment posted";
            state.commentList.data.push(action.payload.data.comment);
            state.commentList.count += 1;
        })
        .addCase(postComment.rejected, (state, action) => {
            state.isCreatingComment = false;
            state.hasErrorCreating = true;
            state.errorMessage = action.payload.error;
        })
    }
})

export const selectErrorMessage = (state) => state.comment.errorMessage;
export const selectSuccessMessage = (state) => state.comment.successMessage;

export const hasErrorList = (state) => state.comment.hasErrorList;
export const isLoadingList = (state) => state.comment.isLoadingList;
export const selectCommentList = (state) => state.comment.commentList;

export const hasErrorCreating = (state) => state.comment.hasErrorCreating;
export const isCreatingComment = (state) => state.comment.isCreatingComment;

export default commentSlice.reducer;