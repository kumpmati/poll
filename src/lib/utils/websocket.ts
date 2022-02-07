import { browser } from '$app/env';
import type { Answer, Results } from '$lib/types/poll';
import { variables } from './env';
import { io } from 'socket.io-client';
import { readable } from 'svelte/store';
import type { Readable } from 'svelte/store';

export const connectSocketIO = (initialData: Results, pollId: string): Readable<Results> => {
	if (!browser) return; // only run client side

	const socket = io(`${variables.WS_URL}?id=${pollId}`);

	let data: Results = initialData;

	socket.on('connect', () => {
		console.log('connected');
	});

	socket.on('disconnect', (d) => {
		console.log(d, 'disconnected');
	});

	return readable<Results>(initialData, (set) => {
		const setInitialData = (d: Results) => {
			data = d;
			set(data);
		};

		const update = (d: Answer) => {
			data = { ...data, answers: [...data.answers, d] };
			set(data);
		};

		socket.on('newAnswer', update);
		socket.on('initialData', setInitialData);

		return () => {
			socket.off('newAnswer', update);
			socket.off('initialData', setInitialData);
		};
	});
};
