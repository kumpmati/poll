import type { Poll } from '$lib/types/poll';

export type Stats = Record<string, number> & {
	totalSubmissions: number;
	totalSubmissionOptions: number;
};

export const calculateStats = (poll: Poll): Stats => {
	const stats: Stats = {
		totalSubmissions: poll.answers.length,
		totalSubmissionOptions: 0
	};

	for (const opt of poll.options) {
		stats[opt.id] = 0;
	}

	for (const ans of poll.answers) {
		for (const opt of ans.options) {
			stats[opt] += 1;
			stats.totalSubmissionOptions += 1;
		}
	}

	return stats;
};
