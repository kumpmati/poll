import { getPoll } from '$lib/utils/api';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler<{ id: string }> = async ({ params }) => {
  const poll = await getPoll(params.id);

  if (!poll) {
    return {
      status: 404,
      message: 'poll not found'
    };
  }

  return {
    body: { poll }
  };
};
