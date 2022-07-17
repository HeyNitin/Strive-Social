import { createSlice } from "@reduxjs/toolkit";
import { postTypes } from "appRedux/postSlice";

type initialStateTypes = {
	token: string;
	loggedInUser: userData;
};

export type userData = {
	id: string;
	firstName: string;
	lastName: string;
	username: String;
	password: string;
	followers: string[];
	following: string[];
	bookmarks: postTypes[];
	profilePicture: string;
	createdAt: string;
	updatedAt: string;
};

const initialState: initialStateTypes = {
	token: "",
	loggedInUser: {
		bookmarks: [],
		createdAt: "",
		firstName: "",
		followers: [],
		following: [],
		id: "",
		profilePicture: "",
		lastName: "",
		password: "",
		updatedAt: "",
		username: "",
	},
};

const userSlice = createSlice({
	name: "userData",
	initialState,
	reducers: {
		setToken: (state, action: { type: string; payload: string }) => {
			state.token = action.payload;
		},
		setLoggedInUser: (state, action: { type: string; payload: userData }) => {
			state.loggedInUser = action.payload;
		},
		updateBookmarks: (
			state,
			action: { type: string; payload: postTypes[] }
		) => {
			state.loggedInUser.bookmarks = action.payload;
		},
	},
});

export default userSlice.reducer;

export const { setToken, setLoggedInUser, updateBookmarks } = userSlice.actions;
