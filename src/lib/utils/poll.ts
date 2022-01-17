import type { Answer, Poll } from '$lib/types/poll';

const BASE_URL = import.meta.env.VITE_API_URL;

export type PartialPoll = Pick<Poll, 'title' | 'options' | 'maxChoices' | 'allowMultipleAnswers'>;

export const createPoll = async (poll: PartialPoll): Promise<Poll> => {
	const newPoll: Poll = {
		...poll,

		// override these values
		id: '',
		answers: [],
		created: new Date(),
		requireAuth: false
	};

	const response = await fetch(`${BASE_URL}/new`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newPoll)
	});

	return await response.json();
};

export const getPoll = async (id: string): Promise<Poll> => {
	const response = await fetch(`${BASE_URL}/poll/${id}`);

	return await response.json();
};

export const submitAnswer = async (id: string, selections: string[]): Promise<Poll> => {
	const answer: Answer = {
		id: Date.now().toString(),
		options: selections,
		submitted: new Date()
	};

	const response = await fetch(`${BASE_URL}/poll/${id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(answer)
	});

	return await response.json();
};
