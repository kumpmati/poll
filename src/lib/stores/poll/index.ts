import type { Poll, PollSection } from '$lib/schemas/poll';
import { writable, type Writable } from 'svelte/store';

export type PollStore = Writable<Omit<Poll, 'sections'>>;

export const createMainPollStore = (initial: Omit<Poll, 'sections'>): PollStore => {
	return writable<Omit<Poll, 'sections'>>(initial);
};

export type PollSectionStore = { id: string; store: Writable<PollSection> };

export const createPollSectionStore = (initial: PollSection): PollSectionStore => {
	return {
		id: initial.id,
		store: writable(initial)
	};
};
