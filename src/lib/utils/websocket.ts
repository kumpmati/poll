import { browser } from '$app/env';
import type { Answer, Poll } from '$lib/types/poll';
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { variables } from './env';

type WebSocketHelper = {
	answers: Writable<Answer>;
	initial: Writable<Poll>;
};

export const connectWebSocket = (poll: Poll): WebSocketHelper => {
	if (!browser) return; // only run client side

	const answers = writable<Answer>(null);
	const initial = writable<Poll>(poll);

	const ws = new WebSocket(`${variables.WS_URL}/${poll.id}`);

	ws.addEventListener('open', () => console.log('connected'));
	ws.addEventListener('close', () => console.log('disconnected'));

	ws.addEventListener('message', (d) => {
		// data is either the full poll or just a single new answer
		try {
			const data = JSON.parse(d.data);

			if ('answers' in data) {
				const newPoll = data as Poll;
				initial.set(newPoll);
			} else if ('submitted' in data) {
				const answer = data as Answer;
				answers.set(answer);
			}
		} catch (err) {
			console.warn('error parsing incoming data:', err);
		}
	});

	return {
		answers,
		initial
	};
};
