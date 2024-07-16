import { FC } from "react";

import styled from "styled-components";

const sizes: { [key: string]: string } = {
	normal: "50",
	medium: "60",
	"1.5x": "75",
	large: "92",
	"2x": "100",
	big: "112",
	huge: "117",
	extra: "141",
	fit: "auto",
};

interface KeyProps {
	main?: string | React.ReactNode;
	subText?: string;
	count: number;
	color?: "dark" | "light";
	size?: keyof typeof sizes;
	highlighted: boolean;
	isMouse?: boolean;
}

const shouldForwardProp = (prop: string) =>
	!["main", "subText", "count", "color", "size", "highlighted", "isMouse"].includes(prop);

const StyledKey = styled.div.withConfig({ shouldForwardProp })<KeyProps>`
	width: ${(props) => (props.size !== "fit" ? `${sizes[props.size as keyof typeof sizes]}px` : props.size)};
	flex-grow: ${(props) => (props.size === "fit" ? 1 : 0)};
	flex-shrink: ${(props) => (props.size === "fit" ? 1 : 0)};
	flex-basis: ${(props) => (props.size !== "fit" ? `${sizes[props.size as keyof typeof sizes]}px` : props.size)};
	background-color: ${(props) => (props.isMouse ? "transparent" : props.color === "dark" ? "var(--gray1)" : "var(--gray2)")};
	height: ${(props) => (props.isMouse ? "100%" : "50px")};
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 4px;
	position: relative;
	overflow: hidden;

	&::before {
		content: "";
		width: 100%;
		height: 100%;
		border-radius: 5px;
		position: absolute;
		z-index: 0;
		top: 0;
		left: 0;
		opacity: 0;
		background-color: ${(props) => (props.color === "light" ? "#343439" : "#121215")};
		${(props) => (props.highlighted ? "animation: fadeOut 500ms ease-in forwards;" : "")}
	}

	@keyframes fadeOut {
		0%,
		70% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
`;

const MainRow = styled.div`
	font-weight: 500;
	display: flex;
	gap: 3px;
	position: relative;
	z-index: 1;
`;

const Main = styled.div`
	color: var(--white);

	svg path {
		fill: var(--white);
	}
`;

const Sub = styled.div`
	font-size: 12px;
	color: var(--gray7);
	translate: 0 2px;
`;

const Counter = styled.div<{ color: KeyProps["color"] }>`
	font-size: 12px;
	color: ${(props) => (props.color === "dark" ? "var(--gray3)" : "var(--gray5)")};
	position: relative;
	z-index: 1;
`;

const Key: FC<KeyProps> = ({ count, size = "normal", color = "light", main, subText, highlighted, isMouse }) => {
	return (
		<StyledKey count={count} size={size} color={color} main={main} subText={subText} highlighted={highlighted} isMouse={isMouse}>
			<MainRow>
				<Main>{main}</Main>
				{subText && <Sub>{subText}</Sub>}
			</MainRow>
			<Counter color={color}>{count}</Counter>
		</StyledKey>
	);
};

export default Key;
