import activitySlice from "./slices/activity";
import mainSlice from "./slices/main";

export default {
	...mainSlice.actions,
	...activitySlice.actions,
};
