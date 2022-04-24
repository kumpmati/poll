import type { Poll } from '$lib/types/poll';

export const validateFormFields = (form: Poll): boolean => {
  return form.title !== '' && form.choices.every((c) => c.text !== '');
};
