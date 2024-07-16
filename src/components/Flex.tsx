import styled from "styled-components";

interface FlexProps {
	column?: boolean;
	gap?: number;
	alignItems?: "center" | "start" | "end";
	justifyContent?: "center" | "start" | "end" | "space-between";
}

const shouldForwardProp = (prop: string) => !["column", "gap", "alignItems", "justifyContent"].includes(prop);

const Flex = styled.div.withConfig({
	shouldForwardProp,
})<FlexProps>`
	display: flex;
	${(props) => (props.column ? "flex-direction: column;" : "")}
	${(props) => (props.gap ? `gap: ${props.gap}px;` : "")}
	${(props) => (props.alignItems ? `align-items: ${props.alignItems}` : "")}
	${(props) => (props.justifyContent ? `justify-content: ${props.justifyContent}` : "")}
`;

export default Flex;
