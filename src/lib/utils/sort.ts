import type { Option, Poll } from '$lib/types/poll';

export const getSortedPollOptions = (poll: Poll, stats: Record<string, number>): Option[] => {
	const sorted = poll.options.sort((a, b) => {
		const aValue = stats?.[a.id] ?? 0;
		const bValue = stats?.[b.id] ?? 0;

		return bValue - aValue;
	});

	return sorted;
};
