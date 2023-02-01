import type { Poll } from '$lib/schemas/poll';
import { nanoid } from 'nanoid';
import { get, writable, type Readable } from 'svelte/store';

export const POLL_FORM_STORE = Symbol('form');

type PollFormState = {
	currentSection: number;
	loading: boolean;
	answers: { id: string; selected: string[] }[];
};

export type PollFormStore = Readable<PollFormState> & {
	answerSection: (id: string, selected: string[]) => boolean;
	submitPollAnswer: () => Promise<boolean>;
};

export const pollFormStore = (poll: Poll): PollFormStore => {
	const state = writable<PollFormState>({
		currentSection: 0,
		loading: false,
		answers: []
	});

	const setLoading = (value: boolean) =>
		state.update((prev) => {
			prev.loading = value;
			return prev;
		});

	const submitPoll = async () => {
		const stateValue = get(state);

		setLoading(true);

		const promises = await Promise.allSettled(
			stateValue.answers.map(async (ans) => {
				const response = await fetch(`/poll/${poll.id}/submit`, {
					method: 'POST',
					body: JSON.stringify({
						id: nanoid(),
						sectionId: ans.id,
						data: ans.selected,
						timestamp: Date.now()
					})
				}).catch((err) => {
					console.log(err);
					return null;
				});

				return response?.ok ?? false;
			})
		);

		setLoading(false);

		return promises.length === stateValue.answers.length;
	};

	const answerSection: PollFormStore['answerSection'] = (id, selected) => {
		const index = poll.sections.findIndex((s) => s.id === id);
		if (index === -1) return false;

		state.update((prev) => {
			prev.answers.push({ id, selected });

			if (index < poll.sections.length - 1) {
				prev.currentSection = index + 1;
			}

			return prev;
		});

		return true;
	};

	return {
		subscribe: state.subscribe,
		submitPollAnswer: submitPoll,
		answerSection
	};
};
