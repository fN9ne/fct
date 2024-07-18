import { FC } from "react";
import styled from "styled-components";
import Flex from "./Flex";

import ClickTrackerIcon from "@icons/clickTracker.svg?react";
import ActivityTrackerIcon from "@icons/activityTracker.svg?react";
import { NavLink } from "react-router-dom";

interface INavbarLink {
	icon: React.ReactNode;
	path: string;
}

const StyledHeader = styled.header`
	height: 100%;
	position: fixed;
	left: 40px;
	top: 0;
	display: flex;
	align-items: center;
`;

const NavbarList = styled(Flex).attrs({ as: "ul" })``;

const NavbarLink = styled(NavLink)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	border-radius: 5px;
	background-color: var(--gray8);
	transition: 250ms;

	svg path {
		fill: var(--white);
	}

	&.active {
		background-color: var(--gray2);
	}

	&:hover {
		background-color: var(--gray4);
	}
`;

const Header: FC = () => {
	const links: INavbarLink[] = [
		{ icon: <ClickTrackerIcon />, path: "/click-tracker" },
		{ icon: <ActivityTrackerIcon />, path: "/activity-tracker" },
	];

	return (
		<StyledHeader>
			<nav>
				<NavbarList column gap={8}>
					{links.map((link, index) => (
						<li key={index}>
							<NavbarLink to={link.path}>{link.icon}</NavbarLink>
						</li>
					))}
				</NavbarList>
			</nav>
		</StyledHeader>
	);
};

export default Header;
