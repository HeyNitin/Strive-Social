import { createSlice } from "@reduxjs/toolkit";
import { postTypes } from "appRedux/postSlice";

export type follow = {
	profilePicture: string;
	firstName: string;
	lastName: string;
	username: string;
	id: string;
};

export type userData = {
	id: string;
	firstName: string;
	lastName: string;
	username: String;
	password: string;
	followers: follow[];
	following: follow[];
	bookmarks: postTypes[];
	profilePicture: string;
	bio: string;
	website: string;
	createdAt: string;
	updatedAt: string;
};

type initialStateTypes = {
	token: string;
	loggedInUser: userData;
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
		bio: "",
		website: "",
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
