import ActivityItem from "@/components/ActivityItem";
import Flex from "@/components/Flex";
import { useAppSelector } from "@/hooks/useAppSelector";
import { IActivityEntry } from "@/redux/slices/activity";
import { FC } from "react";
import styled from "styled-components";

const Container = styled.div`
	max-width: 1640px;
	padding: 0 20px;
	margin: 0 auto;
	width: 100%;
`;

const ActivityTracker: FC = () => {
	const { activity } = useAppSelector((state) => state.activity);

	const getLastEntries = (data: IActivityEntry[]): IActivityEntry[] => {
		const appMap = new Map();

		data.forEach((entry) => {
			const { appName, endTime } = entry;

			if (!appMap.has(appName) || new Date(appMap.get(appName).endTime) < new Date(endTime)) {
				appMap.set(appName, entry);
			}
		});

		return Array.from(appMap.values());
	};

	return (
		<Container>
			<Flex flexWrap gap={12} itemsInRow={5}>
				{getLastEntries(activity).map((item, index) => (
					<ActivityItem key={index} {...item} />
				))}
			</Flex>
		</Container>
	);
};

export default ActivityTracker;
