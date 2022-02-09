<script context="module">
  import { getPoll, getPollResults } from '$lib/utils/poll';

  export const load = async ({ page }) => {
    const { id } = page.params;

    const poll = await getPoll(id).catch(() => null);
    if (!poll) return;

    const results = await getPollResults(id).catch(() => null);
    if (!results) return;

    return {
      props: {
        poll,
        results
      }
    };
  };
</script>

<script lang="ts">
  import type { Poll, Results as ResultsType } from '$lib/types/poll';
  import { calculateStats } from '$lib/utils/stats';
  import PollResults from '$lib/components/PollResults/PollResults.svelte';
  import { onMount } from 'svelte';
  import { connectSocketIO } from '$lib/utils/websocket';
  import Button from '$lib/components/Button/Button.svelte';

  export let poll: Poll;
  export let results: ResultsType;

  // stats update when poll or results update
  $: stats = calculateStats(poll, results);

  onMount(() => {
    connectSocketIO(results, poll.id).subscribe((value) => (results = value));
  });
</script>

<svelte:head>
  <title>Results - {poll.title}</title>
</svelte:head>

<h1>{poll.title}</h1>

<div class="subtitle">
  <h2>Results</h2>
  <div class="numbers">
    <p>
      <b>{stats.totalSubmissions}</b>
      <span class="subtle">{stats.totalSubmissions === 1 ? 'submission' : 'submissions'}</span>
    </p>
    {#if poll.maxChoices > 1}
      <span class="subtle">({stats.totalSubmissionOptions} total options selected)</span>
    {/if}
  </div>
</div>

<PollResults {poll} {stats} />

<div class="controls">
  <Button priority="secondary" link={`/${poll.id}`}>Back</Button>
</div>

<style>
  h1 {
    font-family: 'Urbanist';
    font-size: 4rem;
    margin-top: 8rem;
    word-wrap: break-word;
    hyphens: auto;
  }

  @media screen and (max-width: 700px) {
    h1 {
      font-size: 2.5rem !important;
    }
  }

  .subtitle {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    color: var(--text-subtle);
  }

  .subtitle h2 {
    font-family: 'Urbanist';
    margin-right: 1rem;
  }

  .subtitle p {
    color: var(--text);
  }

  .subtle {
    color: var(--text-subtle);
  }

  .numbers {
    text-align: right;
  }

  h1 {
    font-size: 4rem;
    font-weight: 400;
  }

  p {
    margin: 0;
  }

  .controls {
    margin-top: 5rem;
    display: flex;
  }
</style>
