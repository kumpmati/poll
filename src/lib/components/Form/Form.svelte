<script lang="ts">
  import type { Poll } from '$lib/types/poll';
  import { nanoid } from 'nanoid';
  import Title from './Title/Title.svelte';
  import Description from './Description/Description.svelte';
  import Choices from './Choices/Choices.svelte';
  import Settings from './Settings/Settings.svelte';
  import { createEventDispatcher } from 'svelte';
  import { validateFormFields } from '$lib/utils/form';
  import { fly } from 'svelte/transition';
  import ChevronRight from '../Icons/chevron-right.svelte';
  import Button from '../Atoms/Button.svelte';
  import Spinner from '../Atoms/Spinner.svelte';

  export let loading: boolean;

  const dispatch = createEventDispatcher();

  // index of the stage the user is in.
  // this is increased with each section of the form
  let stage = 0;

  const stageTitles = [
    'Add a title', // unused
    'Add a description (optional)',
    'Add choices',
    'Configure settings'
  ];

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
      allowMultipleAnswers: false,
      shuffleAnswers: true
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

  const onSectionDone = (index: number) => index >= stage && (stage += 1);
</script>

<form on:submit|preventDefault={onSubmit} class="flex flex-col gap-8">
  <Title inFocus={stage === 0} bind:value={form.title} on:done={() => onSectionDone(0)} />

  {#if stage >= 1}
    <span in:fly|local={{ y: -10, duration: 200 }}>
      <Description
        inFocus={stage === 1}
        bind:value={form.description}
        on:done={() => onSectionDone(1)}
      />
    </span>
  {/if}

  {#if stage >= 2}
    <span in:fly|local={{ y: -10, duration: 200 }}>
      <Choices inFocus={stage === 2} bind:choices={form.choices} />
    </span>
  {/if}

  {#if stage >= 3}
    <span in:fly|local={{ y: -10, duration: 200 }}>
      <Settings bind:settings={form.settings} choices={form.choices} />
    </span>
  {/if}

  {#if stage < 3}
    <button
      type="button"
      on:click={() => (stage += 1)}
      class="flex items-center hover:gap-1 w-max font-extrabold text-sm rounded-md text-neutral-300 hover:text-neutral-400 dark:text-neutral-500  hover:dark:text-neutral-400"
    >
      {stageTitles[stage + 1]}
      <ChevronRight size={20} />
    </button>
  {/if}

  {#if stage >= 3}
    <Button type="submit" on:click={onSubmit} disabled={loading}>
      {#if loading}
        <Spinner /> Creating
      {:else}
        Create poll
      {/if}
    </Button>
  {/if}
</form>
