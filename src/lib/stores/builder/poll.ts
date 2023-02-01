import type { ChoiceData, PollOutput } from '$lib/types/poll';
import { nanoid } from 'nanoid';
import { derived, get, writable, type Readable, type Writable } from 'svelte/store';
import { sectionBuilder, type SectionBuilderStore } from './section';

export type Input<ST extends string, CT extends string, CD extends ChoiceData> = Omit<
	PollOutput<ST, CT, CD>,
	'sections'
>;

export type ReadableState<ST extends string, CT extends string, CD extends ChoiceData> = Input<
	ST,
	CT,
	CD
> & {
	sections: { id: string; builder: SectionBuilderStore<ST, CT, CD> }[];
};

export type PollBuilderStore<ST extends string, CT extends string, CD extends ChoiceData> = {
	addSection: (type: ST) => SectionBuilderStore<ST, CT, CD>;
	removeSection: (id: string) => void;
	build: () => PollOutput<ST, CT, CD>;
} & Writable<Input<ST, CT, CD>> &
	Readable<ReadableState<ST, CT, CD>>;

/**
 * Poll builder store.
 */
export const pollBuilder = <ST extends string, CT extends string, CD extends ChoiceData>(
	initial?: Input<ST, CT, CD>
): PollBuilderStore<ST, CT, CD> => {
	const state = writable<Input<ST, CT, CD>>(initial);
	const sectionsBuilders = writable<SectionBuilderStore<ST, CT, CD>[]>([]);
	const readableState = derived([state, sectionsBuilders], ([$state, $sectionBuilders]) => ({
		...$state,
		sections: $sectionBuilders.map((s) => ({
			id: get(s).id,
			builder: s
		}))
	}));

	/**
	 * Adds a section to the builder.
	 * @param type Type of the section
	 * @param store
	 */
	const addSection = (type: ST): SectionBuilderStore<ST, CT, CD> => {
		const builder = sectionBuilder<ST, CT, CD>({ id: nanoid(), type });

		sectionsBuilders.update((prev) => {
			prev.push(builder);
			return prev;
		});

		return builder;
	};

	/**
	 * Removes a section from the builder
	 */
	const removeSection = (id: string) => {
		sectionsBuilders.update((prev) => {
			const index = prev.findIndex((s) => get(s).id === id);
			if (index === -1) return prev;

			prev.splice(index, 1);

			return prev;
		});
	};

	return {
		subscribe: readableState.subscribe,
		set: state.set,
		update: state.update,

		addSection,
		removeSection,

		build: () => {
			const val = get(readableState);

			return {
				...val,
				sections: val.sections.map((s) => s.builder.build())
			};
		}
	};
};
