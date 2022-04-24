<script lang="ts">
  import type { Choice, Poll } from '$lib/types/poll';
  import SvelteMarkdown from 'svelte-markdown';
  import AnswerForm from '$lib/components/AnswerForm/AnswerForm.svelte';
  import { submitAnswer } from '$lib/utils/api';
  import { nanoid } from 'nanoid';
  import { goto } from '$app/navigation';

  export let poll: Poll;

  const onSubmit = async (e: CustomEvent<Choice[]>) => {
    const selectionIds = e.detail.map((item) => item.id);

    const userId = nanoid();

    const response = await submitAnswer(poll.id, selectionIds, userId);
    if (response.success) {
      await goto(`/${poll.id}/results`);
    }
  };
</script>

<svelte:head>
  <title>{poll.title}</title>
</svelte:head>

<div class="relative top-[10rem]">
  <h1 class="font-extrabold text-4xl text-neutral-700 dark:text-neutral-300">{poll.title}</h1>

  {#if poll.description}
    <div class="font-main text-neutral-600 dark:text-neutral-400 text-lg py-4">
      <SvelteMarkdown source={poll.description} />
    </div>
  {/if}

  <AnswerForm {poll} on:submit={onSubmit} />
</div>
