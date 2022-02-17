export interface OptionProps {
	[key: string]: boolean;
}

export interface EditingOptionsSelectorProps {
	options: OptionProps;
	onOptionsChange: any;
}

export interface EditingOptionsProps {
	id: string;
	text: string;
}
