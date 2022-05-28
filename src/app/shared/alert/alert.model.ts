export interface Alert {
	type: 'success' | 'danger' | 'info' | 'warning';
	message: string;
	autoClose?: boolean;
}
