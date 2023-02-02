import type { PollChoice, PollSection } from '$lib/schemas/poll';
import { nanoid } from 'nanoid';
import { derived, get, writable, type Readable, type Writable } from 'svelte/store';
import { choiceBuilder, type ChoiceBuilderStore } from './choice';

type Input = Omit<PollSection, 'choices'>;

export type SectionReadableState = Input & {
	choices: { id: string; builder: ChoiceBuilderStore }[];
};

export type SectionBuilderStore = {
	addChoice: (type: PollChoice['type'], value: any) => ChoiceBuilderStore;
	getChoices: () => ChoiceBuilderStore[];
	removeChoice: (id: string) => void;
	build: () => PollSection;
} & Writable<Input> &
	Readable<SectionReadableState>;

export const sectionBuilder = (initial?: Input): SectionBuilderStore => {
	const state = writable<Input>(initial);
	const choices = writable<ChoiceBuilderStore[]>([]);

	/**
	 * Adds a choice builder to the section.
	 */
	const addChoice = (type: PollChoice['type'], value: any): ChoiceBuilderStore => {
		const builder = choiceBuilder({ id: nanoid(), type, data: value });

		choices.update((prev) => {
			prev.push(builder);
			return prev;
		});

		return builder;
	};

	/**
	 * Removes a choice builder from the section
	 */
	const removeChoice = (id: string) => {
		choices.update((prev) => {
			const index = prev.findIndex((c) => get(c).id === id);
			if (index === -1) return prev;

			prev.splice(index, 1);
			return prev;
		});
	};

	const getChoices = () => {
		return get(choices);
	};

	const builtValue = derived([state, choices], ([$state, $choices]) => {
		return {
			...$state,
			choices: $choices.map((s) => ({ id: get(s).id, builder: s }))
		};
	});

	return {
		subscribe: builtValue.subscribe,
		set: state.set,
		update: state.update,

		addChoice,
		removeChoice,
		getChoices,
		build: () => {
			const v = get(builtValue);

			return {
				...v,
				choices: v.choices.map((c) => get(c.builder))
			};
		}
	};
};
