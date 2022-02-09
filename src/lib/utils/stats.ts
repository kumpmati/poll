import type { Poll, Results } from '$lib/types/poll';

export type Stats = Record<string, number> & {
  totalSubmissions: number;
  totalSubmissionOptions: number;
};

export const calculateStats = (poll: Poll, results: Results): Stats => {
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
