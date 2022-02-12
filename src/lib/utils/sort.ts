import type { Option, Poll } from '$lib/types/poll';
import type { Stats } from './stats';

export const getChoiceModeSortedOptions = (poll: Poll, stats: Stats): Option[] => {
  const sorted = poll.options.sort((a, b) => {
    const aValue = stats?.[a.id] ?? 0;
    const bValue = stats?.[b.id] ?? 0;

    return bValue - aValue;
  });

  return sorted;
};

export const getOrderModeSortedOptions = (poll: Poll, stats: Stats): Option[] => {
  return poll.options.sort((a, b) => stats[b.id] - stats[a.id]);
};
