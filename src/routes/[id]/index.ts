import { getPoll } from '$lib/utils/api';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler<{ id: string }> = async ({ params }) => {
  const poll = await getPoll(params.id);

  if (!poll) {
    return {
      status: 404,
      error: new Error('page not found')
    };
  }

  return {
    status: 200,
    body: { poll }
  };
};
