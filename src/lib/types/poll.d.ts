export type Option = {
	id: string;
	text: string;
};

export type Answer = {
	id: string;
	uid?: string;
	options: string[];
	submitted: Date;
};

export type Poll = {
	id: string;
	title: string;
	created: Date;
	options: Option[];
	maxChoices: number;
	allowMultipleAnswers: boolean;
	requireAuth: boolean;
	answers: Answer[];
};
