import type { Poll, Results } from '$lib/types/poll';

export type Stats = Record<string, number> & {
  totalSubmissions: number;
  totalSubmissionOptions: number;
};

export const calculateChoiceStats = (poll: Poll, results: Results): Stats => {
  const stats: Stats = {
    totalSubmissions: results.answers.length,
    totalSubmissionOptions: 0
  };

  for (const opt of poll.options) {
    stats[opt.id] = 0;
  }

  for (const ans of results.answers) {
    for (const opt of ans.options) {
      stats[opt] += 1;
      stats.totalSubmissionOptions += 1;
    }
  }

  return stats;
};

export const calculateOrderStats = (poll: Poll, results: Results): Stats => {
  const stats: Stats = {
    totalSubmissions: results.answers.length,
    totalSubmissionOptions: results.answers.length * poll.options.length
  };

  for (const option of poll.options) {
    stats[option.id] = 0;
  }

  for (const answer of results.answers) {
    for (let i = 0; i < answer.options.length; i++) {
      const optionId = answer.options[i];
      if (!stats[optionId]) stats[optionId] = 0;

      stats[optionId] += answer.options.length - i;
    }
  }

  return stats;
};
