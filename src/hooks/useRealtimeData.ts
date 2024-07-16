import supabase from "@/services/supabase";
import { useEffect } from "react";

interface IClickTrackerTable {
	id: number;
	date: string;
	rmbCount: number;
	lmbCount: number;
	lastClickTime: string;
	lastKeyPressTime: string;
	keyboardCount: Record<string, number>;
}

type OnDataChange = (data: IClickTrackerTable | null) => void;

const useRealtimeData = (onDataChange: OnDataChange) => {
	useEffect(() => {
		const channel = supabase
			.channel("realtime-click-tracker")
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "clickTracker",
				},
				(payload) => {
					onDataChange(payload.new as IClickTrackerTable);
				}
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [onDataChange]);
};

export default useRealtimeData;
