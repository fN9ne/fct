import Flex from "@/components/Flex";
import Badge from "@/components/UI/Badge";
import { months } from "@/date";
import { useAppSelector } from "@/hooks/useAppSelector";
import { IActivityEntry } from "@/redux/slices/activity";
import { FC } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

interface IActive {
	isActive: boolean;
}

const shouldForwardProp = (prop: string) => !["isActive"].includes(prop);

const Main = styled(Flex).withConfig({ shouldForwardProp })<IActive>`
	border: 2px solid ${(props) => (props.isActive ? "rgba(79, 178, 173, 0.3)" : "transparent")};
	padding: 22px 18px;
	border-radius: 12px;
	background-color: var(--gray8);
	width: 582px;
`;

const Image = styled.img`
	aspect-ratio: 1 / 1;
	width: 152px;
	border-radius: 12px;
`;

const Content = styled(Flex).withConfig({ shouldForwardProp })<IActive>`
	flex: 1 1 auto;
	padding: 20px;
	border-radius: 12px;
	${(props) => (props.isActive ? "background-color: rgba(79,178,173,0.1);" : "background-color: var(--gray2);")}
`;

const ContentHead = styled(Flex)`
	font-weight: 700;
	font-size: 20px;
	color: var(--white);
	padding: 0 0 9px 0;
	border-bottom: 1px solid var(--gray4);

	span {
		display: block;
	}
`;

const Label = styled.div`
	flex: 0 0 200px;
	font-size: 12px;
	color: var(--gray6);
`;

const Value = styled.div`
	flex: 0 0 130px;
	font-size: 12px;
	font-weight: 500;
	color: var(--gray7);
`;

const History = styled.div`
	background-color: var(--gray8);
	padding: 24px 20px;
	border-radius: 12px;
	max-height: 228px;
	overflow: hidden;
	display: flex;
	flex-direction: column;
`;

const HistoryTrack = styled.div`
	overflow: auto;
	display: flex;
	flex-direction: column;
	gap: 4px;
	padding: 0 12px 0 0;

	&::-webkit-scrollbar {
		width: 6px;
		border-radius: 3px;
		background-color: var(--gray3);

		&-thumb {
			border-radius: 3px;
			background-color: var(--primary);
		}
	}
`;

const HistoryItem = styled(Flex)`
	padding: 14px 16px;
	border-radius: 8px;
	background-color: var(--gray2);
	display: flex;
	justify-content: space-between;
`;

const HistoryLabel = styled.div`
	color: var(--gray6);
`;

const HistoryValue = styled.div`
	font-weight: 500;
	color: var(--gray7);
`;

const ActivityPage: FC = () => {
	const { name } = useParams();

	const { activity, temp } = useAppSelector((state) => state.activity);

	const currentActivity = activity.find((a) => a.appName === name);

	const isActive = currentActivity ? [...temp].map((item) => item.appName).includes(currentActivity.appName) : false;

	/* функция для получения entry's за месяц */

	const getActivityByMonth = (activities: IActivityEntry[]): IActivityEntry[] => {
		const currentDate = new Date();
		const oneMonthAgo = new Date();

		oneMonthAgo.setMonth(currentDate.getMonth() - 1);

		return activities.filter((activity) => {
			const startTime = new Date(activity.startTime);
			return startTime >= oneMonthAgo && startTime <= currentDate;
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

	/* функция для получения названия приложения */

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
		];

		return appNames.find((app) => app.process === process)?.name || "";
	};

	/* функция для получения самой последней активности */

	const findLastEntry = (activities: IActivityEntry[], appName: string): IActivityEntry | undefined => {
		const filteredEntries = activities.filter((entry) => entry.appName === appName);

		if (filteredEntries.length === 0) {
			return undefined;
		}

		const lastEntry = filteredEntries.reduce((lastest, current) => {
			return new Date(current.startTime) > new Date(lastest.startTime) ? current : lastest;
		});

		return lastEntry;
	};

	/* функции на форматирование времени */

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
			return "минута";
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

	const lastEntry = currentActivity ? findLastEntry(activity, currentActivity?.appName) : null;

	return (
		currentActivity && (
			<Flex gap={12} column justifyContent="center">
				<Main isActive={isActive} gap={20}>
					<Image
						src={`/appImages/${currentActivity.appName.toLowerCase().replace(".exe", ".jpg")}`}
						alt={currentActivity.appName}
					/>
					<Content column gap={10} isActive={isActive}>
						<ContentHead justifyContent="space-between" alignItems="center">
							<Flex gap={8}>
								<img src={`/appIcons/${currentActivity.appName.toLowerCase().replace(".exe", ".png")}`} alt="icon" />
								<span>{getActivityName(currentActivity.appName || "")}</span>
							</Flex>
							{isActive && <Badge>ЗАПУЩЕНО</Badge>}
						</ContentHead>
						<Flex column gap={10}>
							<Flex>
								<Label>Проведено в игре за месяц</Label>
								<Value>{getActivityDurationByMonth(activity, currentActivity.appName)}</Value>
							</Flex>
							{lastEntry ? (
								<>
									<Flex>
										<Label>Последний запуск</Label>
										<Value>{getDateTime(lastEntry.startTime)}</Value>
									</Flex>
									<Flex>
										<Label>Последняя сессия</Label>
										<Value>{getTime(lastEntry.duration)}</Value>
									</Flex>
								</>
							) : null}
							<Flex>
								<Label>Запусков за месяц</Label>
								<Value>{getActivityByMonth(activity).length}</Value>
							</Flex>
						</Flex>
					</Content>
				</Main>
				<History>
					<HistoryTrack>
						{getActivityByMonth(activity.filter((a) => a.appName === currentActivity.appName))
							.reverse()
							.map((entry, index) => (
								<HistoryItem key={index}>
									<HistoryLabel>{getDateTime(entry.startTime)}</HistoryLabel>
									<HistoryValue>{getTime(entry.duration)}</HistoryValue>
								</HistoryItem>
							))}
					</HistoryTrack>
				</History>
			</Flex>
		)
	);
};

export default ActivityPage;
