import { pollSchema, type Poll, type PollResults } from '$lib/schemas/poll';
import Gun from 'gun';
import 'gun/sea';
import { readable, writable, type Readable } from 'svelte/store';

export const gun = Gun(['http://localhost:5173']);

export const getPoll = (id: string): Readable<Poll | null> => {
	return readable(null, (set) => {
		gun.get(id).on((data) => set(data));
	});
};

export const getPolls = (): Readable<Record<string, Poll>> => {
	const { subscribe, update } = writable<Record<string, Poll>>({});

	gun.get('polls').map((p) =>
		gun.get(p.id).once((data: any, key) => {
			update((prev) => {
				if (!data) {
					delete prev[key];
					return prev;
				}

				prev[key] = data;

				return prev;
			});
		})
	);

	return {
		subscribe: subscribe
	};
};

export const getPollResults = async (id: string): Promise<PollResults | null> => {
	return new Promise((resolve, reject) => {
		gun.get('poll_results').map((data) => {
			if (data.id === id) resolve(data);
		});

		setTimeout(() => reject('timed out'), 4 * 1000);
	});
};

export const createPollResults = async (id: string) => {
	const data: PollResults = {
		id,
		answers: {}
	};

	return new Promise((resolve, reject) => {
		gun
			.get('poll_results')
			.get(id)
			.put(data)
			.once((data) => (data ? resolve(data) : reject('poll_results')));
	});
};

export const createPoll = async (user: string, poll: Poll): Promise<Poll> => {
	const result = await pollSchema.spa(poll);
	if (!result.success) {
		throw new Error(`Invalid poll: ${result.error.message}`);
	}

	// save poll under user's polls
	await once(gun.user().get('polls').get(result.data.id).put(result.data));
	await once(gun.get('polls').set({ id: poll.id }));

	return poll;
};

export const createUser = async (alias: string, pass: string) => {
	await new Promise((resolve, reject) => {
		gun.user().create(alias, pass, (ack: any) => (ack.err ? reject(ack.err) : resolve(ack)));
	});

	// add info for the user
	const info = await once(
		gun.get(`user:${alias}`).get('info').put({ alias, joinedAt: Date.now() })
	);

	return info;
};

export const once = async <T>(func: any): Promise<T> => {
	return new Promise((resolve, reject) => {
		func().once((data: T) => (data ? resolve(data) : reject(data)));
	});
};
