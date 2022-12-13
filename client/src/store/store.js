import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../fearutes/auth/authSlice";
import userReducer from "../fearutes/user/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});
