import { Data } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Data & { lastKeyPressed: string | null; lastButtonClicked: string | null } = {
	id: 0,
	date: "16.07.2024",
	keyboardCount: {},
	lastClickTime: null,
	lastButtonClicked: null,
	lastKeyPressed: null,
	lastKeyPressTime: null,
	lmbCount: 0,
	rmbCount: 0,
};

const mainSlice = createSlice({
	name: "main",
	initialState,
	reducers: {
		updateData(state, action: PayloadAction<Data>) {
			return {
				...state,
				...action.payload,
			};
		},
		updateLastButtonClicked(state, action: PayloadAction<string | null>) {
			state.lastButtonClicked = action.payload;
		},
		updateLastKeyPressed(state, action: PayloadAction<string | null>) {
			state.lastKeyPressed = action.payload;
		},
	},
});

export default mainSlice;
