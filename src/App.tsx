import { FC } from "react";
import { AnimatePresence as AP } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ClickTracker from "./pages/ClickTracker";
import MainLayout from "./layouts/MainLayout";
import ActivityTracker from "./pages/ActivityTracker";

const App: FC = () => {
	const location = useLocation();

	return (
		<AP mode="wait" initial={false}>
			<Routes location={location} key={location.pathname}>
				<Route element={<MainLayout />}>
					<Route index element={<Navigate to="/click-tracker" />} />
					<Route path="/click-tracker" element={<ClickTracker />} />
					<Route path="/activity-tracker" element={<ActivityTracker />} />
				</Route>
			</Routes>
		</AP>
	);
};

export default App;
