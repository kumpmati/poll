import type { ChoiceData, ChoiceOutput } from '$lib/types/poll';
import { writable, type Writable } from 'svelte/store';

export type ChoiceBuilderStore<CT extends string, CD extends ChoiceData> = Writable<
	ChoiceOutput<CT, CD>
>;

export const choiceBuilder = <CT extends string, CD extends ChoiceData>(
	initial?: ChoiceOutput<CT, CD>
): ChoiceBuilderStore<CT, CD> => {
	return writable<ChoiceOutput<CT, CD>>(initial);
};
