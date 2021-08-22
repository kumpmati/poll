import type { Poll } from '$lib/types/poll';

export const calculateStats = (poll: Poll): Record<string, number> => {
	const stats = { total: 0 };

	for (const opt of poll.options) {
		stats[opt.id] = 0;
	}

	for (const ans of poll.answers) {
		for (const opt of ans.options) {
			stats[opt] += 1;
			stats.total += 1;
		}
	}

	return stats;
};
