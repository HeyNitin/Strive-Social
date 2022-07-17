import { configureStore } from "@reduxjs/toolkit";
import userReducer from "appRedux/userSlice";
import postReducer from "appRedux/postSlice";

export const store = configureStore({
	reducer: {
		userData: userReducer,
		posts: postReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
