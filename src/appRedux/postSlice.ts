import { createSlice } from "@reduxjs/toolkit";

export type userType = {
	profilePicture: string;
	firstName: string;
	lastName: string;
	username: string;
	id: string;
};
export type likedBy = {
	profilePicture: string;
	firstName: string;
	lastName: string;
	username: string;
	id: string;
};

export type commentedBy = {
	profilePicture: string;
	firstName: string;
	lastName: string;
	username: string;
	id: string;
	comment: string;
};

export type likesTypes = {
	likeCount: Number;
	likedBy: likedBy[];
};

export type commentsTypes = {
	commentCount: Number;
	commentedBy: commentedBy[];
};

export type postTypes = {
	content: string;
	id: string;
	user: userType;
	likes: likesTypes;
	comments: commentsTypes;
	createdAt: string;
	updatedAt: string;
};

const post: postTypes = {
	content: "",
	id: "",
	user: {
		firstName: "",
		id: "",
		lastName: "",
		profilePicture: "",
		username: "",
	},
	likes: { likeCount: 0, likedBy: [] },
	comments: { commentCount: 0, commentedBy: [] },
	createdAt: "",
	updatedAt: "",
};

const initialState: { posts: postTypes[] } = { posts: [post] };

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		setPosts: (state, action: { type: string; payload: postTypes[] }) => {
			state.posts = action.payload;
		},
	},
});

export default postSlice.reducer;
export const { setPosts } = postSlice.actions;
