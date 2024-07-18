import Header from "@/components/Header";
import { FC, useEffect, useState } from "react";

import { motion as m } from "framer-motion";
import { Outlet } from "react-router-dom";

const MainLayout: FC = () => {
	const [isHeader, setIsHeader] = useState<boolean>(false);

	const transitions = {
		initial: { opacity: 0, scale: 0.95 },
		animate: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 0.95 },
	};

	useEffect(() => {
		const storedData = localStorage.getItem("me");

		if (storedData && storedData === "fN9ne") {
			setIsHeader(true);
		} else {
			setIsHeader(false);
		}
	}, []);

	return (
		<>
			{isHeader && <Header />}
			<m.div {...transitions} className="content">
				<Outlet />
			</m.div>
		</>
	);
};

export default MainLayout;
