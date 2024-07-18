import styled from "styled-components";

interface FlexProps {
	column?: boolean;
	gap?: number;
	alignItems?: "center" | "start" | "end";
	justifyContent?: "center" | "start" | "end" | "space-between";
	flexWrap?: boolean;
	itemsInRow?: number;
}

const shouldForwardProp = (prop: string) =>
	!["column", "gap", "alignItems", "justifyContent", "flexWrap", "itemsInRow"].includes(prop);

const calcChildWidth = (gap: number, itemsInRow: number): string => {
	const gapCalc = gap ? ` - (${gap}px - ${gap}px/${itemsInRow})` : "";
	return `calc(100% / ${itemsInRow}${gapCalc})`;
};

const Flex = styled.div.withConfig({
	shouldForwardProp,
})<FlexProps>`
	display: flex;
	${(props) => (props.flexWrap ? "flex-wrap: wrap;" : "")}
	${(props) => (props.column ? "flex-direction: column;" : "")}
	${(props) => (props.gap ? `gap: ${props.gap}px;` : "")}
	${(props) => (props.alignItems ? `align-items: ${props.alignItems}` : "")}
	${(props) => (props.justifyContent ? `justify-content: ${props.justifyContent}` : "")}
	${(props) =>
		props.itemsInRow
			? `
		& > div {
			flex: 0 0 ${calcChildWidth(props.gap || 0, props.itemsInRow)};
		}
	`
			: ""}
`;

export default Flex;
