import type { PollChoice } from '$lib/schemas/poll';
import { writable, type Writable } from 'svelte/store';

export type ChoiceBuilderStore = Writable<PollChoice>;

export const choiceBuilder = (initial?: PollChoice): ChoiceBuilderStore => {
	return writable<PollChoice>(initial);
};
