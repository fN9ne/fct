import { combineReducers, configureStore } from "@reduxjs/toolkit";
import mainSlice from "./slices/main";

const rootReducer = combineReducers({
	main: mainSlice.reducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
