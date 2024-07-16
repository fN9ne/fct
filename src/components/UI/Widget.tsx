import { FC } from "react";
import styled from "styled-components";
import Flex from "../Flex";

interface WidgetProps {
	label: string;
	value: string;
}

const StyledWidget = styled.div`
	flex: 0 0 calc(100% / 5 - (24px - 24px / 5));
	border-radius: 16px;
	background-color: var(--gray8);
	padding: 20px;
`;

const WidgetLabel = styled.div`
	color: var(--gray6);
`;

const WidgetValue = styled.div`
	color: var(--white);
	font-weight: 700;
	font-size: 20px;
`;

const Widget: FC<WidgetProps> = ({ label, value }) => {
	return (
		<StyledWidget>
			<Flex column gap={8}>
				<WidgetLabel>{label}</WidgetLabel>
				<WidgetValue>{value}</WidgetValue>
			</Flex>
		</StyledWidget>
	);
};

export default Widget;
