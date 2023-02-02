import type { Poll, PollSection } from '$lib/schemas/poll';
import { nanoid } from 'nanoid';
import { derived, get, writable, type Readable, type Writable } from 'svelte/store';
import { sectionBuilder, type SectionBuilderStore } from './section';

export type Input = Omit<Poll, 'sections'>;

export type ReadableState = Input & {
	sections: { id: string; builder: SectionBuilderStore }[];
};

export type PollBuilderStore = {
	addSection: (type: PollSection['type']) => SectionBuilderStore;
	removeSection: (id: string) => void;
	build: () => Poll;
} & Writable<Input> &
	Readable<ReadableState>;

/**
 * Poll builder store.
 */
export const pollBuilder = (initial?: Input): PollBuilderStore => {
	const state = writable<Input>(initial);
	const sectionsBuilders = writable<SectionBuilderStore[]>([]);
	const readableState = derived([state, sectionsBuilders], ([$state, $sectionBuilders]) => {
		return {
			...$state,
			sections: $sectionBuilders.map((s) => ({
				id: get(s).id,
				builder: s
			}))
		};
	});

	/**
	 * Adds a section to the builder.
	 * @param type Type of the section
	 * @param store
	 */
	const addSection = (type: PollSection['type']): SectionBuilderStore => {
		const builder = sectionBuilder({
			id: nanoid(),
			type,
			title: 'Untitled section',
			description: ''
		});

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

	const build = () => {
		const val = get(readableState);

		return {
			...val,
			sections: val.sections.map((s) => s.builder.build())
		};
	};

	return {
		subscribe: readableState.subscribe,
		set: state.set,
		update: state.update,

		addSection,
		removeSection,

		build
	};
};
