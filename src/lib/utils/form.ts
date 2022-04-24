import type { Poll } from '$lib/types/poll';
import type { Readable } from 'svelte/store';
import { writable } from 'svelte-local-storage-store';

export const validateFormFields = (form: Poll): boolean => {
  return form.title !== '' && form.choices.every((c) => c.text !== '');
};

export type FormSubmissionStore = Readable<Record<string, Date>> & {
  setSubmitted: (id: string) => void;
};

export const createSubmissionHistory = (): FormSubmissionStore => {
  const store = writable('submittedPolls', {});

  const setSubmitted = (id: string) => {
    store.update((prev) => ({ ...prev, [id]: new Date() }));
  };

  return {
    subscribe: store.subscribe,
    setSubmitted
  };
};
