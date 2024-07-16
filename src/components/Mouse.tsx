import { FC } from "react";

import styled from "styled-components";
import Key from "./UI/Key";
import { useAppSelector } from "@/hooks/useAppSelector";

const StyledMouse = styled.div`
	width: 200px;
	background-color: var(--gray8);
	border-radius: 50px 50px 100px 100px;
`;

const MouseHead = styled.div`
	height: 40%;
	border-bottom: 1px solid var(--gray4);
	display: flex;

	& > div {
		&::before {
			border-radius: 0;
		}
		&:first-child {
			border-right: 1px solid var(--gray4);
			border-radius: 50px 0 0 0;
		}
		&:last-child {
			border-radius: 0 50px 0 0;
		}
	}
`;

const Mouse: FC = () => {
	const { lmbCount, rmbCount, lastButtonClicked } = useAppSelector((state) => state.main);

	return (
		<StyledMouse>
			<MouseHead>
				<Key isMouse size="fit" highlighted={lastButtonClicked === "LMB"} count={lmbCount} main="LMB" />
				<Key isMouse size="fit" highlighted={lastButtonClicked === "RMB"} count={rmbCount} main="RMB" />
			</MouseHead>
		</StyledMouse>
	);
};

export default Mouse;
