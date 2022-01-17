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

export const submitAnswer = async (
	pollId: string,
	selections: string[],
	userId: string
): Promise<Poll | null> => {
	const answer: Answer = {
		id: Date.now().toString(),
		uid: userId,
		options: selections,
		submitted: new Date()
	};

	const response = await fetch(`${BASE_URL}/poll/${pollId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(answer)
	});

	if (!response.ok) {
		console.error(await response.text());
		return null;
	}

	return await response.json();
};
