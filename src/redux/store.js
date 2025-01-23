import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slice/userSlice";
import authReducer from "../slice/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
});

export default store;
