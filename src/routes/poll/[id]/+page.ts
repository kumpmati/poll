import { getPoll } from '$lib/gun';
import type { Poll } from '$lib/schemas/poll';
import { error, type Load } from '@sveltejs/kit';

export const load: Load<{ id: string }, any, any, Poll> = async ({ params }) => {
	const id = params.id;

	const poll = await getPoll(id);

	if (!poll) throw error(404, 'not found');

	return poll;
};
