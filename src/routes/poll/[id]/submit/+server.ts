import { initDb, createPollResponse } from '$lib/database';
import { error, json } from '@sveltejs/kit';
import { pollResponseSchema } from '$lib/schemas/poll';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ params, request }) => {
	await initDb();

	const body = await request.json();

	const result = await pollResponseSchema.spa(body);
	if (!result.success) {
		throw error(400, 'malformed');
	}

	if (result.data.pollId !== params.id) {
		throw error(400, 'wrong poll id');
	}

	const res = await createPollResponse(result.data);

	return json({ id: res.id });
};
