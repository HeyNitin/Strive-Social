import { configureStore } from "@reduxjs/toolkit";
import userReducer from "appRedux/userSlice";

export const store = configureStore({
	reducer: {
		userData: userReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
