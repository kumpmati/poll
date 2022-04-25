import type { Choice, Poll } from '$lib/types/poll';
import type { Stats } from './stats';

export const getChoiceModeSortedOptions = (poll: Poll, stats: Stats): Choice[] => {
  const sorted = poll.choices.sort((a, b) => {
    const aValue = stats?.[a.id] ?? 0;
    const bValue = stats?.[b.id] ?? 0;

    return bValue - aValue;
  });

  return sorted;
};

export const getOrderModeSortedOptions = (poll: Poll, stats: Stats): Choice[] => {
  return poll.choices.sort((a, b) => stats[b.id] - stats[a.id]);
};

export const shuffle = <T>(array: T[]): T[] => {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
};
