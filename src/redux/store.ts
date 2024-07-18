import { combineReducers, configureStore } from "@reduxjs/toolkit";
import mainSlice from "./slices/main";
import activitySlice from "./slices/activity";

const rootReducer = combineReducers({
	main: mainSlice.reducer,
	activity: activitySlice.reducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
