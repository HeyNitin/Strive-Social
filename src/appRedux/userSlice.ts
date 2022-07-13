import { createSlice } from "@reduxjs/toolkit";

type initialStateTypes = {
	token: string;
};

const initialState: initialStateTypes = {
	token: "",
};

const userSlice = createSlice({
	name: "userData",
	initialState,
	reducers: {
		setToken: (state, action: { type: string; payload: string }) => {
			state.token = action.payload;
		},
	},
});

export default userSlice.reducer;

export const { setToken } = userSlice.actions;
