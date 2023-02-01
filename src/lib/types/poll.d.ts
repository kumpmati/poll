export type PollBuilder<
	ST extends string = string,
	CT extends string = string,
	CD extends ChoiceData = any
> = {
	id: string;
	type: 'all_sections_normal' | 'all_sections_random' | 'one_section_random';
	meta: {
		title: string;
		description: string;
		createdAt: string;
		author: string | null;
	};
	sections: SectionBuilder<ST, CT, CD>[];

	build: () => PollOutput<ST, CT, CD>;
};

export interface SectionBuilder<ST extends string, CT extends string, CD extends ChoiceData> {
	id: string;
	choices: ChoiceBuilder<CT, CD>[];
	build: () => SectionOutput<ST, CT, CD>;
}

export interface ChoiceBuilder<CT extends string, CD extends ChoiceData> {
	id: string;
	build: () => ChoiceOutput<CT, CD>;
}

/*
 * Output values
 */

export type PollOutput<
	ST extends string = string,
	CT extends string = string,
	CD extends ChoiceData = any
> = Omit<PollBuilder<StaticRange, CT, CD>, 'build' | 'sections'> & {
	sections: SectionOutput<ST, CT, CD>[];
};

export type SectionOutput<ST extends string, CT extends string, CD extends ChoiceData> = {
	id: string;
	type: ST;
	choices: ChoiceOutput<CT, CD>[];
};

export type ChoiceOutput<CT extends string, CD extends ChoiceData> = {
	id: string;
	type: CT;
	data: CD;
};

type ChoiceData = string | number | Record<string, any>;
