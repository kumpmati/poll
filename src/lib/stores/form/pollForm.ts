import type { Poll, PollResponse, PollResponseItem } from '$lib/schemas/poll';
import { nanoid } from 'nanoid';
import { get, writable, type Readable } from 'svelte/store';

export const POLL_FORM_STORE = Symbol('submit form');

type PollFormState = {
	pollId: string;
	currentSection: number;
	loading: boolean;
	sectionAnswers: Record<string, PollResponseItem[]>;
};

export type PollFormStore = Readable<PollFormState> & {
	answerSection: (sectionId: string, selected: PollResponseItem[]) => boolean;
	submitPoll: () => Promise<boolean>;
};

export const pollFormStore = (poll: Poll): PollFormStore => {
	const state = writable<PollFormState>({
		pollId: poll.id,
		currentSection: 0,
		loading: false,
		sectionAnswers: {}
	});

	const setLoading = (value: boolean) =>
		state.update((prev) => {
			prev.loading = value;
			return prev;
		});

	const submitPoll = async () => {
		const stateValue = get(state);

		const r: PollResponse = {
			id: nanoid(),
			pollId: stateValue.pollId,
			sectionAnswers: stateValue.sectionAnswers
		};

		setLoading(true);

		const response = await fetch(`/poll/${poll.id}/submit`, {
			method: 'POST',
			body: JSON.stringify(r)
		}).catch((err) => {
			console.log(err);
			return null;
		});

		setLoading(false);

		console.log(await response?.text());

		return response?.ok ?? false;
	};

	const answerSection: PollFormStore['answerSection'] = (sectionId, selected) => {
		const index = poll.sections.findIndex((s) => s.id === sectionId);
		if (index === -1) return false;

		state.update((prev) => {
			prev.sectionAnswers[sectionId] = selected;

			if (index < poll.sections.length - 1) {
				prev.currentSection = index + 1;
			}

			return prev;
		});

		return true;
	};

	return {
		subscribe: state.subscribe,
		submitPoll,
		answerSection
	};
};
