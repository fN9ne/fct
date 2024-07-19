import { FC } from "react";
import styled from "styled-components";

const StyledBadge = styled.div`
	height: 16px;
	padding: 0 3px;
	border-radius: 3px;
	border: 1px solid var(--primary);
	color: var(--primary);
	font-size: 10px;
	line-height: 15px;
	font-weight: 400;
	text-transform: uppercase;
	background-color: rgba(79, 178, 173, 0.1);
`;

interface BadgeProps {
	children: React.ReactNode;
}

const Badge: FC<BadgeProps> = ({ children }) => {
	return <StyledBadge>{children}</StyledBadge>;
};

export default Badge;
