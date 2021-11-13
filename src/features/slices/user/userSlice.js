import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api_loginWithData, api_signupWithData } from "../../api/authenticate/api_authenticate";
import { handleError } from "../../api/blogger/api_blogger";

export const signup = createAsyncThunk(
    'user/signup',
    async (data, { rejectWithValue }) => {
        let message = await handleError(api_signupWithData, data, rejectWithValue);

        return message;
    }
)

export const login = createAsyncThunk(
    'user/login',
    async (data, {rejectWithValue}) => {
        let token = await handleError(api_loginWithData, data, rejectWithValue);

        return token;
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isAuthenticated: false,
        token: "",
        user: {},
        isSigningup: false,
        isLoggingin: false,
        hasErrorSignup: false,
        hasErrorLogin: false,
        signupSuccess: false,
        errorMessage: ""
    },
    reducers: {
        turnOffSignupSuccess: (state) => {
            state.signupSuccess = false;
        },
        resetData: (state) => {
            state.isSigningup = false;
            state.isLoggingin = false;
            state.hasErrorLogin = false;
            state.hasErrorSignup = false;
            state.signupSuccess = false;
            state.errorMessage = "";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signup.pending, (state) => {
            state.isSigningup = true;
            state.hasErrorSignup = false;
        })
        .addCase(signup.fulfilled, (state, action) => {
            state.isSigningup = false;
            state.hasErrorSignup = false;
            state.signupSuccess = true;
        })
        .addCase(signup.rejected, (state, action) => {
            state.isSigningup = false;
            state.hasErrorSignup = true;
            state.errorMessage = action.payload.error;
        })
        .addCase(login.pending, (state) => {
            state.isLoggingin = true;
            state.hasErrorLogin = false;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoggingin = false;
            state.hasErrorLogin = false;
            state.token = action.payload.data.token;
            state.isAuthenticated = true;
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoggingin = false;
            state.hasErrorLogin = true;
            state.errorMessage = action.payload.error;
        })
    }
})

export const selectErrorMessage = (state) => state.user.errorMessage;

export const hasErrorSignup = (state) => state.user.hasErrorSignup;
export const isSigningup = (state) => state.user.isSigningup;
export const selectSignupSuccess = (state) => state.user.signupSuccess;

export const hasErrorLogin = (state) => state.user.hasErrorLogin;
export const isLoggingin = (state) => state.user.isLoggingin;

export const isAuthenticated = (state) => state.user.isAuthenticated;
export const selectToken = (state) => state.user.token;
export const selectUser = (state) => state.user.user;

export const { turnOffSignupSuccess, resetData } = userSlice.actions;

export default userSlice.reducer;
