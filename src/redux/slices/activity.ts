import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IActivityEntry {
	appName: string;
	startTime: string;
	endTime: string;
	duration: number;
}

export interface ITempEntry {
	appName: string;
	startTime: string;
}

interface activityState {
	activity: IActivityEntry[];
	temp: ITempEntry[];
}

const initialState: activityState = {
	activity: [],
	temp: [],
};

const activitySlice = createSlice({
	name: "activity",
	initialState,
	reducers: {
		setActivities(state, action: PayloadAction<IActivityEntry[]>) {
			state.activity = action.payload;
		},
		setTempActivities(state, action: PayloadAction<ITempEntry[]>) {
			state.temp = action.payload;
		},
	},
});

export default activitySlice;
