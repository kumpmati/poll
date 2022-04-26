import type { Choice, Poll } from '$lib/types/poll';

export const getCanSubmit = (poll: Poll, selections: Choice[]): boolean => {
  if (poll.settings.mode === 'order') return true;
  if (selections.length < poll.settings.minChoices) return false;
  if (selections.length > poll.settings.maxChoices) return false;
  return true;
};

export const getChooseText = (poll: Poll): string => {
  if (poll.settings.maxChoices === poll.settings.minChoices) {
    return `Choose ${poll.settings.maxChoices}`;
  }

  return `Choose ${poll.settings.minChoices}-${poll.settings.maxChoices}`;
};

export const getSubmitButtonText = (poll: Poll, selections: Choice[]): string => {
  const { minChoices, maxChoices, mode } = poll.settings;

  if (mode === 'order') {
    return 'Submit';
  }

  if (minChoices == 0) {
    return 'Submit';
  }

  if (selections.length < minChoices) {
    if (minChoices - maxChoices === 0) {
      return `Choose ${minChoices - selections.length} more`;
    } else {
      return `Choose at least ${minChoices - selections.length} more`;
    }
  }
};
