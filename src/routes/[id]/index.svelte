<script lang="ts">
  import type { Choice, Poll } from '$lib/types/poll';
  import AnswerForm from '$lib/components/AnswerForm/AnswerForm.svelte';
  import { submitAnswer } from '$lib/utils/api';
  import { nanoid } from 'nanoid';
  import { goto } from '$app/navigation';
  import Markdown from '$lib/components/Markdown/Markdown.svelte';
  import { createSubmissionHistory } from '$lib/utils/form';

  export let poll: Poll;

  const submissionHistory = createSubmissionHistory();

  let loading = false;
  let hasSubmitted = poll.settings.allowMultipleAnswers ? false : !!$submissionHistory[poll.id];

  const onSubmit = async (e: CustomEvent<Choice[]>) => {
    loading = true;

    const selectionIds = e.detail.map((item) => item.id);
    const userId = nanoid();
    const response = await submitAnswer(poll.id, selectionIds, userId);

    if (response.success) {
      submissionHistory.setSubmitted(poll.id);
      await goto(`/${poll.id}/results`);
    }

    loading = false;
  };
</script>

<svelte:head>
  <title>{poll.title}</title>
</svelte:head>

<div class="relative mt-[10rem] mb-20">
  <h1 class="font-extrabold text-4xl mb-4 text-neutral-700 dark:text-neutral-300">{poll.title}</h1>

  {#if poll.description}
    <Markdown value={poll.description} />
  {/if}

  <div class="mt-[5rem]">
    <AnswerForm {poll} {loading} {hasSubmitted} on:submit={onSubmit} />
  </div>
</div>
