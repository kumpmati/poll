import type { Poll, Results } from '$lib/types/poll';

export type Stats = Record<string, number> & {
  totalSubmissions: number;
  totalSelectedChoices: number;
};

export const calculateChoiceStats = (poll: Poll, results: Results): Stats => {
  const stats: Stats = {
    totalSubmissions: results.answers.length,
    totalSelectedChoices: 0
  };

  for (const opt of poll.choices) {
    stats[opt.id] = 0;
  }

  for (const ans of results.answers) {
    for (const opt of ans.selected) {
      stats[opt] += 1;
      stats.totalSelectedChoices += 1;
    }
  }

  return stats;
};

export const calculateOrderStats = (poll: Poll, results: Results): Stats => {
  const stats: Stats = {
    totalSubmissions: results.answers.length,
    totalSelectedChoices: results.answers.length * poll.choices.length
  };

  for (const option of poll.choices) {
    stats[option.id] = 0;
  }

  for (const answer of results.answers) {
    for (let i = 0; i < answer.selected.length; i++) {
      const optionId = answer.selected[i];
      if (!stats[optionId]) stats[optionId] = 0;

      stats[optionId] += answer.selected.length - i;
    }
  }

  return stats;
};
