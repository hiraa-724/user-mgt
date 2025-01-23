import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  error: null,
  registrationSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;
    },

    registerSuccess: (state, action) => {
      state.registrationSuccess = true;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.registrationSuccess = false;
      state.error = action.payload;
    },

    forgotPasswordRequest: (state) => {
      state.error = null;
    },
    forgotPasswordSuccess: (state) => {
      state.error = null;
    },
    forgotPasswordFailure: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
      state.registrationSuccess = false;
    },
  },
});

export const {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  forgotPasswordRequest,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
