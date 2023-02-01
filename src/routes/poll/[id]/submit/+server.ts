import { initDb, createPollResponse } from '$lib/database';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { pollResponseSchema } from '$lib/schemas/poll';

export const POST: RequestHandler = async ({ request }) => {
	await initDb();

	const result = await pollResponseSchema.spa(await request.json());
	if (!result.success) {
		throw error(400, 'malformed');
	}

	const res = await createPollResponse(result.data);

	return json({ id: res.id });
};
