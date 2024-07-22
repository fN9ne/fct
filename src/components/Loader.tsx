import styled from "styled-components";

const Loader = styled.div`
	width: 16px;
	height: 16px;
	border-radius: 50%;
	border: 2px solid transparent;
	border-top-color: var(--primary);
	animation: rotate 1s linear infinite;

	@keyframes rotate {
		to {
			rotate: 360deg;
		}
	}
`;

export default Loader;
