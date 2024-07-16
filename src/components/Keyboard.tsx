import { FC } from "react";

import styled from "styled-components";
import Flex from "./Flex";
import Key from "./UI/Key";

import BackspaceIcon from "@icons/backslash.svg?react";
import WinIcon from "@icons/win.svg?react";
import ArrTopIcon from "@icons/arrTop.svg?react";
import ArrBottomIcon from "@icons/arrBottom.svg?react";
import ArrLeftIcon from "@icons/arrLeft.svg?react";
import ArrRightIcon from "@icons/arrRight.svg?react";
import { useAppSelector } from "@/hooks/useAppSelector";

const StyledKeyboard = styled.div`
	background-color: var(--gray8);
	padding: 20px;
	border-radius: 16px;
`;

const Keyboard: FC = () => {
	const { keyboardCount, lastKeyPressed } = useAppSelector((state) => state.main);

	const getKeyCount = (name: string): number => {
		return keyboardCount[name] || 0;
	};

	return (
		<StyledKeyboard>
			<Flex gap={16}>
				<Flex column gap={16}>
					<Flex gap={58}>
						<Key main="Esc" color="dark" count={getKeyCount("ESCAPE")} highlighted={lastKeyPressed === "ESCAPE"} />
						<Flex gap={29}>
							<Flex gap={4}>
								<Key main="F1" count={getKeyCount("F1")} highlighted={lastKeyPressed === "F1"} />
								<Key main="F2" count={getKeyCount("F2")} highlighted={lastKeyPressed === "F2"} />
								<Key main="F3" count={getKeyCount("F3")} highlighted={lastKeyPressed === "F3"} />
								<Key main="F4" count={getKeyCount("F4")} highlighted={lastKeyPressed === "F4"} />
							</Flex>
							<Flex gap={4}>
								<Key main="F5" color="dark" count={getKeyCount("F5")} highlighted={lastKeyPressed === "F5"} />
								<Key main="F6" color="dark" count={getKeyCount("F6")} highlighted={lastKeyPressed === "F6"} />
								<Key main="F7" color="dark" count={getKeyCount("F7")} highlighted={lastKeyPressed === "F7"} />
								<Key main="F8" color="dark" count={getKeyCount("F8")} highlighted={lastKeyPressed === "F8"} />
							</Flex>
							<Flex gap={4}>
								<Key main="F9" count={getKeyCount("F9")} highlighted={lastKeyPressed === "F9"} />
								<Key main="F10" count={getKeyCount("F10")} highlighted={lastKeyPressed === "F10"} />
								<Key main="F11" count={getKeyCount("F11")} highlighted={lastKeyPressed === "F11"} />
								<Key main="F12" count={getKeyCount("F12")} highlighted={lastKeyPressed === "F12"} />
							</Flex>
						</Flex>
					</Flex>
					<Flex column gap={4}>
						<Flex gap={4}>
							<Key main="Ё" subText="`" count={getKeyCount("SECTION")} highlighted={lastKeyPressed === "SECTION"} />
							<Key main="1" subText="!" count={getKeyCount("1")} highlighted={lastKeyPressed === "1"} />
							<Key main="2" subText="@" count={getKeyCount("2")} highlighted={lastKeyPressed === "2"} />
							<Key main="3" subText="#" count={getKeyCount("3")} highlighted={lastKeyPressed === "3"} />
							<Key main="4" subText="$" count={getKeyCount("4")} highlighted={lastKeyPressed === "4"} />
							<Key main="5" subText="%" count={getKeyCount("5")} highlighted={lastKeyPressed === "5"} />
							<Key main="6" subText="^" count={getKeyCount("6")} highlighted={lastKeyPressed === "6"} />
							<Key main="7" subText="&" count={getKeyCount("7")} highlighted={lastKeyPressed === "7"} />
							<Key main="8" subText="*" count={getKeyCount("8")} highlighted={lastKeyPressed === "8"} />
							<Key main="9" subText="(" count={getKeyCount("9")} highlighted={lastKeyPressed === "9"} />
							<Key main="0" subText=")" count={getKeyCount("0")} highlighted={lastKeyPressed === "0"} />
							<Key main="-" subText="_" count={getKeyCount("MINUS")} highlighted={lastKeyPressed === "MINUS"} />
							<Key main="=" subText="+" count={getKeyCount("EQUALS")} highlighted={lastKeyPressed === "EQUALS"} />
							<Key
								main={<BackspaceIcon />}
								count={getKeyCount("BACKSPACE")}
								color="dark"
								size="2x"
								highlighted={lastKeyPressed === "BACKSPACE"}
							/>
						</Flex>
						<Flex gap={4}>
							<Key main="Tab" count={getKeyCount("TAB")} color="dark" size="1.5x" highlighted={lastKeyPressed === "TAB"} />
							<Key main="Q" subText="Й" count={getKeyCount("Q")} highlighted={lastKeyPressed === "Q"} />
							<Key main="W" subText="Ц" count={getKeyCount("W")} highlighted={lastKeyPressed === "W"} />
							<Key main="E" subText="У" count={getKeyCount("E")} highlighted={lastKeyPressed === "E"} />
							<Key main="R" subText="К" count={getKeyCount("R")} highlighted={lastKeyPressed === "R"} />
							<Key main="T" subText="Е" count={getKeyCount("T")} highlighted={lastKeyPressed === "T"} />
							<Key main="Y" subText="Н" count={getKeyCount("Y")} highlighted={lastKeyPressed === "Y"} />
							<Key main="U" subText="Г" count={getKeyCount("U")} highlighted={lastKeyPressed === "U"} />
							<Key main="I" subText="Ш" count={getKeyCount("I")} highlighted={lastKeyPressed === "I"} />
							<Key main="O" subText="Щ" count={getKeyCount("O")} highlighted={lastKeyPressed === "O"} />
							<Key main="P" subText="З" count={getKeyCount("P")} highlighted={lastKeyPressed === "P"} />
							<Key
								main="[{"
								subText="Х"
								count={getKeyCount("SQUARE BRACKET OPEN")}
								highlighted={lastKeyPressed === "SQUARE BRACKET OPEN"}
							/>
							<Key
								main="]}"
								subText="Ъ"
								count={getKeyCount("SQUARE BRACKET CLOSE")}
								highlighted={lastKeyPressed === "SQUARE BRACKET CLOSE"}
							/>
							<Key main="\ | /" count={getKeyCount("BACKSLASH")} size="1.5x" highlighted={lastKeyPressed === "BACKSLASH"} />
						</Flex>
						<Flex gap={4}>
							<Key
								main="Caps"
								count={getKeyCount("CAPS LOCK")}
								color="dark"
								size="large"
								highlighted={lastKeyPressed === "CAPS LOCK"}
							/>
							<Key main="A" subText="Ф" count={getKeyCount("A")} highlighted={lastKeyPressed === "A"} />
							<Key main="S" subText="Ы" count={getKeyCount("S")} highlighted={lastKeyPressed === "S"} />
							<Key main="D" subText="В" count={getKeyCount("D")} highlighted={lastKeyPressed === "D"} />
							<Key main="F" subText="А" count={getKeyCount("F")} highlighted={lastKeyPressed === "F"} />
							<Key main="G" subText="П" count={getKeyCount("G")} highlighted={lastKeyPressed === "G"} />
							<Key main="H" subText="Р" count={getKeyCount("H")} highlighted={lastKeyPressed === "H"} />
							<Key main="J" subText="О" count={getKeyCount("J")} highlighted={lastKeyPressed === "J"} />
							<Key main="K" subText="Л" count={getKeyCount("K")} highlighted={lastKeyPressed === "K"} />
							<Key main="L" subText="Д" count={getKeyCount("L")} highlighted={lastKeyPressed === "L"} />
							<Key main=": ;" subText="Ж" count={getKeyCount("SEMICOLON")} highlighted={lastKeyPressed === "SEMICOLON"} />
							<Key main={"\" '"} subText="Э" count={getKeyCount("QUOTE")} highlighted={lastKeyPressed === "QUOTE"} />
							<Key main="Enter" count={getKeyCount("RETURN")} color="dark" size="big" highlighted={lastKeyPressed === "RETURN"} />
						</Flex>
						<Flex gap={4}>
							<Key
								main="Shift"
								count={getKeyCount("LEFT SHIFT")}
								color="dark"
								size="huge"
								highlighted={lastKeyPressed === "LEFT SHIFT"}
							/>
							<Key main="Z" subText="Я" count={getKeyCount("Z")} highlighted={lastKeyPressed === "Z"} />
							<Key main="X" subText="Ч" count={getKeyCount("X")} highlighted={lastKeyPressed === "X"} />
							<Key main="C" subText="С" count={getKeyCount("C")} highlighted={lastKeyPressed === "C"} />
							<Key main="V" subText="М" count={getKeyCount("V")} highlighted={lastKeyPressed === "V"} />
							<Key main="B" subText="И" count={getKeyCount("B")} highlighted={lastKeyPressed === "B"} />
							<Key main="N" subText="Т" count={getKeyCount("N")} highlighted={lastKeyPressed === "N"} />
							<Key main="M" subText="Ь" count={getKeyCount("M")} highlighted={lastKeyPressed === "M"} />
							<Key main="< ," subText="Б" count={getKeyCount("COMMA")} highlighted={lastKeyPressed === "COMMA"} />
							<Key main="> ." subText="Ю" count={getKeyCount("DOT")} highlighted={lastKeyPressed === "DOT"} />
							<Key
								main="? /"
								subText=", ."
								count={getKeyCount("FORWARD SLASH")}
								highlighted={lastKeyPressed === "FORWARD SLASH"}
							/>
							<Key
								main="Shift"
								count={getKeyCount("RIGHT SHIFT")}
								color="dark"
								size="extra"
								highlighted={lastKeyPressed === "RIGHT SHIFT"}
							/>
						</Flex>
						<Flex gap={4}>
							<Key
								main="Ctrl"
								count={getKeyCount("LEFT CTRL")}
								color="dark"
								size="medium"
								highlighted={lastKeyPressed === "LEFT CTRL"}
							/>
							<Key
								main={<WinIcon />}
								count={getKeyCount("LEFT META")}
								color="dark"
								size="medium"
								highlighted={lastKeyPressed === "LEFT META"}
							/>
							<Key
								main="Alt"
								count={getKeyCount("LEFT ALT")}
								color="dark"
								size="medium"
								highlighted={lastKeyPressed === "LEFT ALT"}
							/>
							<Key main="Space" count={getKeyCount("SPACE")} size="fit" highlighted={lastKeyPressed === "SPACE"} />
							<Key
								main="Alt"
								count={getKeyCount("RIGHT ALT")}
								color="dark"
								size="medium"
								highlighted={lastKeyPressed === "RIGHT ALT"}
							/>
							<Key
								main="Ctrl"
								count={getKeyCount("RIGHT CTRL")}
								color="dark"
								size="medium"
								highlighted={lastKeyPressed === "RIGHT CTRL"}
							/>
						</Flex>
					</Flex>
				</Flex>
				<Flex column gap={16}>
					<Flex gap={4}>
						<Key
							main="Print"
							size="medium"
							count={getKeyCount("PRINT SCREEN")}
							color="dark"
							highlighted={lastKeyPressed === "PRINT SCREEN"}
						/>
						<Key
							main="Scroll"
							size="medium"
							count={getKeyCount("SCROLL LOCK")}
							color="dark"
							highlighted={lastKeyPressed === "SCROLL LOCK"}
						/>
						<Key main="Pause" size="medium" count={getKeyCount("PAUSE")} color="dark" highlighted={lastKeyPressed === "PAUSE"} />
					</Flex>
					<Flex column gap={58}>
						<Flex column gap={4}>
							<Flex gap={4}>
								<Key main="Ins" size="medium" count={getKeyCount("INS")} color="dark" highlighted={lastKeyPressed === "INS"} />
								<Key main="Home" size="medium" count={getKeyCount("HOME")} color="dark" highlighted={lastKeyPressed === "HOME"} />
								<Key
									main="PgUp"
									size="medium"
									count={getKeyCount("PAGE UP")}
									color="dark"
									highlighted={lastKeyPressed === "PAGE UP"}
								/>
							</Flex>
							<Flex gap={4}>
								<Key
									main="Del"
									size="medium"
									count={getKeyCount("DELETE")}
									color="dark"
									highlighted={lastKeyPressed === "DELETE"}
								/>
								<Key main="End" size="medium" count={getKeyCount("END")} color="dark" highlighted={lastKeyPressed === "END"} />
								<Key
									main="PgDn"
									size="medium"
									count={getKeyCount("PAGE DOWN")}
									color="dark"
									highlighted={lastKeyPressed === "PAGE DOWN"}
								/>
							</Flex>
						</Flex>
						<Flex column gap={4}>
							<Flex justifyContent="center">
								<Key
									main={<ArrTopIcon />}
									size="medium"
									count={getKeyCount("UP ARROW")}
									color="dark"
									highlighted={lastKeyPressed === "UP ARROW"}
								/>
							</Flex>
							<Flex gap={4}>
								<Key
									main={<ArrLeftIcon />}
									size="medium"
									count={getKeyCount("LEFT ARROW")}
									color="dark"
									highlighted={lastKeyPressed === "LEFT ARROW"}
								/>
								<Key
									main={<ArrBottomIcon />}
									size="medium"
									count={getKeyCount("DOWN ARROW")}
									color="dark"
									highlighted={lastKeyPressed === "DOWN ARROW"}
								/>
								<Key
									main={<ArrRightIcon />}
									size="medium"
									count={getKeyCount("RIGHT ARROW")}
									color="dark"
									highlighted={lastKeyPressed === "RIGHT ARROW"}
								/>
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</StyledKeyboard>
	);
};

export default Keyboard;
