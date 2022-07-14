import { createSlice } from "@reduxjs/toolkit";

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
	followers: [];
	following: [];
	bookmarks: [];
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
	},
});

export default userSlice.reducer;

export const { setToken, setLoggedInUser } = userSlice.actions;
