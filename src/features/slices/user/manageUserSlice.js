import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleError } from "../../api/blogger/api_blogger";
import { api_changeInfoUser, api_deleteUser } from "../../api/manage/api_manageUser";

export const changeInfo = createAsyncThunk(
    'manageUser/changeInfo',
    async ({token, data}, {rejectWithValue}) => {
        let newUser = await handleError(api_changeInfoUser, {token, data}, rejectWithValue);

        return newUser;
    }
)

export const deleteUser = createAsyncThunk(
    'manageUser/deleteUser',
    async ({token, data}, {rejectWithValue}) => {
        let message = await handleError(api_deleteUser, {token, data}, rejectWithValue);

        return message;
    }
)

export const manageUserSlice = createSlice({
    name: "manageUser",
    initialState: {
        //change info
        isChangingInfo: false,
        hasErrorChangingInfo: false,
        changeInfoSuccess: false,
        //delete user
        isDeletingUser: false,
        hasErrorDeletingUser: false,
        deleteUserSuccess: false,
        errorMessage: ""
    },
    reducers: {
        turnOffChangeInfoSuccess: (state) => {
            state.changeInfoSuccess = false;
        },
        turnOffDeleteUserSuccess: (state) => {
            state.deleteUserSuccess = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(changeInfo.pending, (state) => {
            state.isChangingInfo = true;
            state.hasErrorChangingInfo = false;
            state.changeInfoSuccess = false;
        })
        .addCase(changeInfo.fulfilled, (state) => {
            state.isChangingInfo = false;
            state.hasErrorChangingInfo = false;
            state.changeInfoSuccess = true;
        })
        .addCase(changeInfo.rejected, (state, action) => {
            state.isChangingInfo = false;
            state.hasErrorChangingInfo = true;
            state.changeInfoSuccess = false;
            if(Array.isArray(action.payload.error)) state.errorMessage = action.payload.error[0].msg;
            else {
                state.errorMessage = action.payload.error;
            }
        })
        .addCase(deleteUser.pending, (state) => {
            state.isDeletingUser = true;
            state.hasErrorDeletingUser = false;
        })
        .addCase(deleteUser.fulfilled, (state) => {
            state.isDeletingUser = false;
            state.hasErrorDeletingUser = false;
            state.deleteUserSuccess = true;
        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.isDeletingUser = false;
            state.hasErrorDeletingUser = true;
            if(Array.isArray(action.payload.error)) state.errorMessage = action.payload.error[0].msg;
            else {
                state.errorMessage = action.payload.error;
            }
        })
    }
})

export const selectErrorMessage = (state) => state.manageUser.errorMessage;

export const hasErrorChangingInfo = (state) => state.manageUser.hasErrorChangingInfo;
export const isChangingInfo = (state) => state.manageUser.isChangingInfo;
export const selectChangeInfoSuccess = (state) => state.manageUser.changeInfoSuccess;

export const hasErrorDeletingUser = (state) => state.manageUser.hasErrorDeletingUser;
export const isDeletingUser = (state) => state.manageUser.isDeletingUser;
export const selectDeleteUserSuccess = (state) => state.manageUser.deleteUserSuccess;

export const { turnOffChangeInfoSuccess, turnOffDeleteUserSuccess } = manageUserSlice.actions;

export default manageUserSlice.reducer;
