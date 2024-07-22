import { IActivityEntry } from "@/redux/slices/activity";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import Flex from "./Flex";
import { months } from "@/date";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Link } from "react-router-dom";
import Badge from "./UI/Badge";

import PlayIcon from "@icons/play.svg?react";
import Loader from "./Loader";

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
	transition: 250ms ease-in;

	.image {
		width: 100%;
		aspect-ratio: 1 / 1;
		overflow: hidden;
		border-radius: 12px;
		position: relative;

		& > img {
			transition: 500ms ease-out;
		}

		.play-icon {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.35);
			display: flex;
			justify-content: center;
			align-items: center;
			opacity: 0;
			visibility: hidden;
			transition: 400ms ease-out;

			svg {
				width: 100px;
				height: 100px;

				path {
					fill: var(--white);
					opacity: 0.5;
					transition: 350ms ease-in-out 150ms;
				}
			}
		}

		&:hover {
			.play-icon {
				opacity: 1;
				visibility: visible;

				svg path {
					opacity: 1;
				}
			}
		}
	}

	&:hover {
		.image > img {
			scale: 1.05;
		}

		opacity: 0.75;
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
	const { temp, activity } = useAppSelector((state) => state.activity);

	const isActive = [...temp].map((item) => item.appName).includes(appName);

	const [isStarting, setIsStarting] = useState<boolean>(false);

	useEffect(() => {
		if (isActive) {
			setIsStarting(false);
		}
	}, [isActive]);

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
			{ process: "Ravenswatch.exe", name: "Ravenswatch" },
			{ process: "Stardew Valley.exe", name: "Stardew Valley" },
			{ process: "Moonlighter.exe", name: "Moonlighter" },
			{ process: "Ghost Watchers.exe", name: "Ghost Watchers" },
		];

		const activityName = appNames.find((item) => item.process === process)?.name;

		return activityName || appName;
	};

	const handleRunApp = async (appName: string) => {
		try {
			const response = await fetch("http://localhost:3002/api/run-app", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ appName }),
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}

			const result = await response.text();
			console.log(result);
		} catch (error) {
			console.error(`Failed to run app:`, error);
		}
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

	/* функция для получения entry's за месяц */

	const getActivityByMonth = (activities: IActivityEntry[], name: string | null = null): IActivityEntry[] => {
		const currentDate = new Date();
		const oneMonthAgo = new Date();

		oneMonthAgo.setMonth(currentDate.getMonth() - 1);

		return activities.filter((activity) => {
			const startTime = new Date(activity.startTime);
			return startTime >= oneMonthAgo && startTime <= currentDate && (name !== null ? activity.appName === name : true);
		});
	};

	/* функция для получения проведённого времени за месяц */

	const getActivityDurationByMonth = (activities: IActivityEntry[], appName: string): string => {
		const monthlyActivities = getActivityByMonth(activities.filter((a) => a.appName === appName));

		const totalDurationMs = monthlyActivities.reduce((total, activity) => total + activity.duration, 0);

		const totalMinutes = Math.floor(totalDurationMs / 60000);
		const totalHours = Math.floor(totalMinutes / 60);
		const remainingMinutes = totalMinutes % 60;

		const hoursText = `${totalHours} ${getHoursText(totalHours)}`;
		const minutesText = `${remainingMinutes} ${getMinutesText(remainingMinutes)}`;

		return `${totalHours > 0 ? `${hoursText} ` : ""} ${totalHours === 0 && totalMinutes === 0 ? "меньше минуты" : minutesText}`;
	};

	return (
		<Link to={`/activity/${appName}`}>
			<StyledActivityItem column gap={12} isActive={isActive}>
				<div
					className="image"
					onClick={(event) => {
						event.preventDefault();
						event.stopPropagation();
						handleRunApp(appName);
						setIsStarting(true);
					}}
				>
					<Image src={`/appImages/${appName.toLowerCase().replace(".exe", ".jpg")}`} alt={appName} />
					<div className="play-icon">
						<PlayIcon />
					</div>
				</div>
				<Content column gap={12} isActive={isActive}>
					<ContentHead justifyContent="space-between" alignItems={"center"}>
						<Flex gap={5} alignItems={"center"}>
							<img src={`/appIcons/${appName.toLowerCase().replace(".exe", ".png")}`} alt="icon" />
							<ActivityName>{getActivityName(appName)}</ActivityName>
						</Flex>
						{isActive && <Badge>ЗАПУЩЕНО</Badge>}
						{isStarting && <Loader />}
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
							<Label>Времени за месяц</Label>
							<Value>{getActivityDurationByMonth(activity, appName)}</Value>
						</Flex>
						<Flex justifyContent="space-between">
							<Label>Последняя сессия</Label>
							<Value>{isActive ? "сейчас" : getTime(duration)}</Value>
						</Flex>
						<Flex justifyContent="space-between">
							<Label>Запусков за месяц</Label>
							<Value>{getActivityByMonth(activity, appName).length}</Value>
						</Flex>
					</Flex>
				</Content>
			</StyledActivityItem>
		</Link>
	);
};

export default ActivityItem;
