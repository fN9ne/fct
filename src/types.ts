export interface Data {
	keyboardCount: Record<string, number>;
	lmbCount: number;
	rmbCount: number;
	lastClickTime: string | null;
	lastKeyPressTime: string | null;
}
