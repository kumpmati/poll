<script lang="ts">
  import type { Poll } from '$lib/types/poll';
  import { nanoid } from 'nanoid';
  import Title from './Title/Title.svelte';
  import Description from './Description/Description.svelte';
  import Choices from './Choices/Choices.svelte';
  import Settings from './Settings/Settings.svelte';
  import { createEventDispatcher } from 'svelte';
  import { validateFormFields } from '$lib/utils/form';

  export let loading: boolean;

  const dispatch = createEventDispatcher();

  let form: Poll = {
    id: '0',
    title: '',
    description: '',
    choices: [{ id: nanoid(), text: '' }],
    created: new Date(),
    settings: {
      mode: 'choice',
      minChoices: 1,
      maxChoices: 1,
      allowMultipleAnswers: false
    }
  };

  const onSubmit = (e) => {
    if (e.defaultPrevented) return;

    if (!validateFormFields(form)) {
      console.error('form not filled out properly');
      return;
    }

    dispatch('submit', form);
  };
</script>

<form on:submit|preventDefault={onSubmit} class="flex flex-col gap-8">
  <Title bind:value={form.title} />
  <Description bind:value={form.description} />
  <Choices bind:choices={form.choices} />

  <!-- Settings -->
  <Settings bind:settings={form.settings} choices={form.choices} />

  <button
    type="submit"
    on:click={onSubmit}
    disabled={loading}
    class="font-extrabold mt-4 text-neutral-700 p-3 pl-10 pr-10 
    mx-auto dark:text-neutral-300 bg-neutral-200
    dark:bg-neutral-700 hover:bg-neutral-300
    hover:dark:bg-neutral-600 rounded-md w-max"
  >
    Create poll
  </button>
</form>
