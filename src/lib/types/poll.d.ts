import type { Poll, PollSection, PollChoice } from '../schemas/poll';

export type PollBuilder = Omit<Poll, 'sections'> & {
	sections: SectionBuilder[];
	build: () => Poll;
};

export interface SectionBuilder {
	id: string;
	choices: ChoiceBuilder[];
	build: () => PollSection;
}

export interface ChoiceBuilder {
	id: string;
	build: () => PollChoice;
}

type ChoiceData = string | number | Record<string, any>;
