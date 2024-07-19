import { FC, useEffect } from "react";
import { AnimatePresence as AP } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ClickTracker from "./pages/ClickTracker";
import MainLayout from "./layouts/MainLayout";
import ActivityTracker from "./pages/ActivityTracker";
import ActivityPage from "./pages/ActivityPage";
import { useActions } from "./hooks/useActions";
import socket from "./socket";

const App: FC = () => {
	const location = useLocation();

	const { setActivities, setTempActivities } = useActions();

	useEffect(() => {
		const handleConnect = () => {
			socket.emit("getInitialData");
		};

		socket.on("update", (data) => {
			setActivities(data.data);
			setTempActivities(data.temp);
		});
		socket.on("connect", handleConnect);

		return () => {
			socket.off("update", (data) => {
				setActivities(data.data);
			});
			socket.off("connect", handleConnect);
		};
	}, []);

	return (
		<AP mode="wait" initial={false}>
			<Routes location={location} key={location.pathname}>
				<Route element={<MainLayout />}>
					<Route index element={<Navigate to="/click-tracker" />} />
					<Route path="/click-tracker" element={<ClickTracker />} />
					<Route path="/activity-tracker" element={<ActivityTracker />} />
					<Route path="/activity/:name" element={<ActivityPage />} />
				</Route>
			</Routes>
		</AP>
	);
};

export default App;
