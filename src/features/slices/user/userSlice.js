import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api_getCurrentUser, api_loginWithData, api_logout, api_signupWithData } from "../../api/authenticate/api_authenticate";
import { handleError } from "../../api/blogger/api_blogger";

let localStorage = window.localStorage;

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

export const logout = createAsyncThunk(
    'user/logout',
    async (token, {rejectWithValue}) => {
        let output = await handleError(api_logout, {token}, rejectWithValue);

        return output;
    }
)

export const loadCurrentUser = createAsyncThunk(
    'user/loadCurrentUser',
    async (token, {rejectWithValue}) => {
        let user = await handleError(api_getCurrentUser, {token}, rejectWithValue);

        return user;
    }
)

export const loadCurrentUserIni = createAsyncThunk(
    'user/loadCurrentUserIni',
    async (token, {rejectWithValue}) => {
        let user = await handleError(api_getCurrentUser, {token}, rejectWithValue);

        return {token, user};
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
        isLoggingout: false,
        hasErrorSignup: false,
        hasErrorLogin: false,
        hasErrorLogout: false,
        signupSuccess: false,
        logoutSuccess: false,
        //current user
        isLoadingCurrentUser: false,
        hasErrorLoadingUser: false,
        //error message
        errorMessage: ""
    },
    reducers: {
        turnOffSignupSuccess: (state) => {
            state.signupSuccess = false;
        },
        turnOffLogoutSuccess: (state) => {
            state.logoutSuccess = false;
        },
        resetData: (state) => {
            state.isSigningup = false;
            state.isLoggingin = false;
            state.hasErrorLogin = false;
            state.hasErrorSignup = false;
            state.signupSuccess = false;
            state.errorMessage = "";
        },
        logoutCold: (state) => {
            state.isAuthenticated = false;
            state.token =  "";
            state.user = {};
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

            //save token to localStorage
            localStorage.setItem("token", action.payload.data.token);
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoggingin = false;
            state.hasErrorLogin = true;
            state.errorMessage = action.payload.error;
        })
        .addCase(logout.pending, (state, action) => {
            state.isLoggingout = true;
            state.hasErrorLogout = false;
        })
        .addCase(logout.fulfilled, (state, action) => {
            state.isLoggingout = false;
            state.hasErrorLogout = false;
            state.logoutSuccess = true;
            state.isAuthenticated = false;
            state.token =  "";
            state.user = {};

            //remove token from localStorage
            localStorage.removeItem("token");
        })
        .addCase(logout.rejected, (state, action) => {
            state.isLoggingin = false;
            state.hasErrorLogout = true;
        })
        .addCase(loadCurrentUser.pending, (state) => {
            state.isLoadingCurrentUser = true;
            state.hasErrorLoadingUser = false;
        })
        .addCase(loadCurrentUser.fulfilled, (state, action) => {
            state.isLoadingCurrentUser = false;
            state.hasErrorLoadingUser = false;
            state.user = action.payload.data;
        })
        .addCase(loadCurrentUser.rejected, (state) => {
            state.isLoadingCurrentUser = false;
            state.hasErrorLoadingUser = true;
            state.isAuthenticated = false;
            state.token =  "";
            state.user = {};

            //remove token from localStorage
            localStorage.removeItem("token");
        })
        .addCase(loadCurrentUserIni.fulfilled, (state, action) => {
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        })
        .addCase(loadCurrentUserIni.rejected, (state) => {
            //remove token from localStorage
            localStorage.removeItem("token");
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

export const hasErrorLogout = (state) => state.user.hasErrorLogout;
export const isLoggingout = (state) => state.user.isLoggingout;
export const selectLogoutSuccess = (state) => state.user.logoutSuccess;

export const isLoadingCurrentUser = (state) => state.user.isLoadingCurrentUser;
export const hasErrorLoadingUser = (state) => state.user.hasErrorLoadingUser;

export const { turnOffSignupSuccess, turnOffLogoutSuccess, resetData, logoutCold } = userSlice.actions;

export default userSlice.reducer;
