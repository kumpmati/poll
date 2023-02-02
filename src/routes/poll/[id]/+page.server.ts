import { getPollById, initDb } from '$lib/database';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	await initDb();

	const poll = await getPollById(params.id);
	if (!poll) {
		throw error(404, 'not found');
	}

	return poll;
};
