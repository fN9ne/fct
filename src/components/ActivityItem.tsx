import { IActivityEntry } from "@/redux/slices/activity";
import { FC } from "react";
import styled from "styled-components";
import Flex from "./Flex";
import { months } from "@/date";
import { useAppSelector } from "@/hooks/useAppSelector";

const shouldForwardProp = (prop: string) => !["isActive"].includes(prop);

interface IStyledActivityItem {
	isActive: boolean;
}

const StyledActivityItem = styled(Flex).withConfig({
	shouldForwardProp,
})<IStyledActivityItem>`
	background-color: var(--gray8);
	border-radius: 12px;
	padding: 8px;
	border: 2px solid ${(props) => (props.isActive ? "rgba(79, 178, 173, 0.3)" : "transparent")};

	& > img {
		border-radius: 12px;
	}
`;

const Content = styled(Flex).withConfig({ shouldForwardProp })<IStyledActivityItem>`
	padding: 14px 12px;
	${(props) => (props.isActive ? "background-color: rgba(79,178,173,0.1);" : "background-color: var(--gray2);")}
	border-radius: 12px;
`;

const ContentHead = styled(Flex)`
	padding: 0 0 8px 0;
	border-bottom: 1px solid var(--gray4);

	& > img {
		width: 14px;
		aspect-ratio: 1 / 1;
	}
`;

const ActivityName = styled.div`
	font-weight: 700;
	color: var(--white);
`;

const Label = styled.div`
	font-size: 12px;
	color: var(--gray6);
`;

const Value = styled.div`
	font-size: 12px;
	font-weight: 500;
	color: var(--gray7);
`;

const Image = styled.img`
	width: 100%;
	aspect-ratio: 1 / 1;
`;

const ActivityItem: FC<IActivityEntry> = ({ appName, startTime, duration }) => {
	const { temp } = useAppSelector((state) => state.activity);

	const isActive = [...temp].map((item) => item.appName).includes(appName);

	const getActivityName = (process: string): string => {
		const appNames: { process: string; name: string }[] = [
			{ process: "CoreKeeper.exe", name: "Core Keeper" },
			{ process: "dota2.exe", name: "Dota 2" },
			{ process: "eurotrucks2.exe", name: "Euro Truck Simulator 2" },
			{ process: "Brotato.exe", name: "Brotato" },
			{ process: "Code.exe", name: "Visual Studio Code" },
			{ process: "Figma.exe", name: "Figma" },
			{ process: "osu!.exe", name: "osu!" },
			{ process: "Lethal Company.exe", name: "Lethal Company" },
			{ process: "javaw.exe", name: "Minecraft" },
		];

		return appNames.find((app) => app.process === process)?.name || "";
	};

	const getDateTime = (dateString: string): string => {
		const date = new Date(dateString);

		return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} ${date
			.getHours()
			.toString()
			.padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
	};

	const getTime = (seconds: number): string => {
		const hours = Math.floor(seconds / (3600 * 1000));
		const minutes = Math.floor(seconds / (60 * 1000)) - hours * 60;

		return `${hours !== 0 ? hours + " " + getHoursText(hours) : ""} ${
			minutes !== 0 ? minutes + " " + getMinutesText(minutes) : "меньше минуты"
		}`;
	};

	const getMinutesText = (minutes: number) => {
		const lastDigit = minutes % 10;
		if (minutes === 1 || minutes === 21 || minutes === 31 || minutes === 41 || minutes === 51) {
			return "минуту";
		} else if (lastDigit === 2 || lastDigit === 3 || lastDigit === 4) {
			return "минуты";
		} else {
			return "минут";
		}
	};

	const getHoursText = (hours: number) => {
		const lastDigit = hours % 10;
		if (hours === 1 || hours === 21) {
			return "час";
		} else if (
			hours === 2 ||
			hours === 3 ||
			hours === 4 ||
			(hours > 20 && lastDigit === 2) ||
			(hours > 20 && lastDigit === 3) ||
			(hours > 20 && lastDigit === 4)
		) {
			return "часа";
		} else {
			return "часов";
		}
	};

	return (
		<StyledActivityItem column gap={12} isActive={isActive}>
			<Image src={`/appImages/${appName.toLowerCase().replace(".exe", ".jpg")}`} alt={appName} />
			<Content column gap={12} isActive={isActive}>
				<ContentHead gap={5} alignItems={"center"}>
					<img src={`/appIcons/${appName.toLowerCase().replace(".exe", ".png")}`} alt="icon" />
					<ActivityName>{getActivityName(appName)}</ActivityName>
				</ContentHead>
				<Flex column gap={8}>
					<Flex justifyContent="space-between">
						<Label>{isActive ? "Запущено" : "Последний запуск"}</Label>
						<Value>
							{getDateTime(
								isActive ? temp.find((item) => item.appName === appName)?.startTime || new Date().toString() : startTime
							)}
						</Value>
					</Flex>
					<Flex justifyContent="space-between">
						<Label>{isActive ? "Текущая" : "Последняя"} сессия</Label>
						<Value>{isActive ? "сейчас" : getTime(duration)}</Value>
					</Flex>
				</Flex>
			</Content>
		</StyledActivityItem>
	);
};

export default ActivityItem;
