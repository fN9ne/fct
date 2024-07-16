export interface Data {
	id: number;
	date: string;
	rmbCount: number;
	lmbCount: number;
	lastClickTime: string | null;
	lastKeyPressTime: string | null;
	keyboardCount: Record<string, number>;
}
