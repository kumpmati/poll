import { createPoll, initDb } from '$lib/database';
import { pollSchema } from '$lib/schemas/poll';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	await initDb();

	const body = await request.json();

	const result = await pollSchema.spa(body);
	if (!result.success) {
		throw error(400, 'malformed');
	}

	const poll = await createPoll(result.data);
	return json({ id: poll.id });
};
