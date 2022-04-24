import { getPoll, getPollResults } from '$lib/utils/api';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler<{ id: string }> = async ({ params }) => {
  const poll = await getPoll(params.id);
  const results = await getPollResults(params.id);

  if (!poll || !results) {
    return {
      status: 404,
      error: new Error('poll not found')
    };
  }

  return {
    status: 200,
    body: {
      poll,
      results
    }
  };
};
