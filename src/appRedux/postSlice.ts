import { createSlice } from "@reduxjs/toolkit";

export type likesTypes = {
	likeCount: Number;
	likedBy: string[];
	dislikedBy: string[];
};

export type commentsTypes = {
	commentCount: Number;
	commentedBy: string[];
};

export type postTypes = {
	content: string;
	id: string;
	username: string;
	userId: string;
	likes: likesTypes;
	comments: commentsTypes;
	createdAt: string;
	updatedAt: string;
};

const post: postTypes = {
	content: "",
	id: "",
	username: "",
	userId: "",
	likes: { likeCount: 0, likedBy: [""], dislikedBy: [""] },
	comments: { commentCount: 0, commentedBy: [""] },
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
