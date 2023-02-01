import type { ChoiceData, SectionOutput } from '$lib/types/poll';
import { nanoid } from 'nanoid';
import { derived, get, writable, type Readable, type Writable } from 'svelte/store';
import { choiceBuilder, type ChoiceBuilderStore } from './choice';

type Input<ST extends string, CT extends string, CD extends ChoiceData> = Omit<
	SectionOutput<ST, CT, CD>,
	'choices'
>;

export type SectionReadableState<
	ST extends string,
	CT extends string,
	CD extends ChoiceData
> = Input<ST, CT, CD> & { choices: { id: string; builder: ChoiceBuilderStore<CT, CD> }[] };

export type SectionBuilderStore<ST extends string, CT extends string, CD extends ChoiceData> = {
	addChoice: (type: CT, value: CD) => ChoiceBuilderStore<CT, CD>;
	getChoices: () => ChoiceBuilderStore<CT, CD>[];
	removeChoice: (id: string) => void;
	build: () => SectionOutput<ST, CT, CD>;
} & Writable<Input<ST, CT, CD>> &
	Readable<SectionReadableState<ST, CT, CD>>;

export const sectionBuilder = <ST extends string, CT extends string, CD extends ChoiceData>(
	initial?: Input<ST, CT, CD>
): SectionBuilderStore<ST, CT, CD> => {
	const state = writable<Input<ST, CT, CD>>(initial);
	const choices = writable<ChoiceBuilderStore<CT, CD>[]>([]);

	/**
	 * Adds a choice builder to the section.
	 */
	const addChoice = (type: CT, value: CD): ChoiceBuilderStore<CT, CD> => {
		const builder = choiceBuilder<CT, CD>({ id: nanoid(), type, data: value });

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
