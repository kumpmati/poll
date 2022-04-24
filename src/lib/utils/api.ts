import type { Answer, Poll, Results } from '$lib/types/poll';
import { config } from '$lib/config';

const BASE_URL = config.API_URL;

export const createPoll = async (poll: Poll): Promise<Poll> => {
  const response = await fetch(`${BASE_URL}/poll/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(poll)
  });

  return await response.json();
};

export const getPoll = async (id: string): Promise<Poll> => {
  const response = await fetch(`${BASE_URL}/poll/${id}`);

  return await response.json();
};

export const getPollResults = async (id: string): Promise<Results> => {
  const response = await fetch(`${BASE_URL}/poll/${id}/results`);

  return await response.json();
};

export const submitAnswer = async (
  pollId: string,
  selections: string[],
  userId: string
): Promise<{ success: true } | null> => {
  const answer: Answer = {
    id: Date.now().toString(),
    uid: userId,
    selected: selections,
    submitted: new Date()
  };

  const response = await fetch(`${BASE_URL}/poll/${pollId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(answer)
  });

  if (!response.ok) {
    console.error(await response.text());
    return null;
  }

  return await response.json();
};
