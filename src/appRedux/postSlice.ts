import { createSlice } from "@reduxjs/toolkit";

type likesTypes = {
	likeCount: Number;
	likedBy: string[];
	dislikedBy: string[];
};

type postTypes = {
	content: string;
	id: string;
	username: string;
	likes: likesTypes;
	createdAt: string;
	updatedAt: string;
};

const post: postTypes = {
	content: "",
	id: "",
	username: "",
	likes: { likeCount: 0, likedBy: [""], dislikedBy: [""] },
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
