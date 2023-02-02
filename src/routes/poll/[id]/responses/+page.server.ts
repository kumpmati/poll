import { cache } from '$lib/cache';
import { getPollById, getPollResponses, initDb } from '$lib/database';
import { calculateStatistics } from '$lib/utils/statistics';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ params }) => {
	await initDb();

	// cache poll for 60 seconds
	const poll = await cache.getOrUpdate(`poll-${params.id}`, () => getPollById(params.id), 60);
	if (!poll) {
		throw error(404, 'not found');
	}

	// cache responses and statistics for 1 second.
	// This should prevent spamming the results page from
	// making too many big requests to the database
	const statistics = await cache.getOrUpdate(
		`statistics-${params.id}`,
		async () => {
			const responses = await getPollResponses(params.id);
			return calculateStatistics(poll, responses);
		},
		1
	);

	return {
		poll,
		statistics
	};
};
