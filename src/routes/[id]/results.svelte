<script context="module">
  import { getPoll, getPollResults } from '$lib/utils/api';

  export const load = async ({ page }) => {
    const { id } = page.params;

    const poll = await getPoll(id).catch(() => null);
    if (!poll) return;

    const results = await getPollResults(id).catch(() => null);
    if (results?.status === 404) return;

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
  import PollResults from '$lib/components/PollResults/PollResults.svelte';
  import { onMount } from 'svelte';
  import { connectSocketIO } from '$lib/utils/websocket';
  import Button from '$lib/components/Button/Button.svelte';

  export let poll: Poll;
  export let results: ResultsType;

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
      <b>{results.answers.length}</b>
      <span class="subtle">{results?.answers.length === 1 ? 'submission' : 'submissions'}</span>
    </p>
  </div>
</div>

<PollResults {poll} {results} />

<div class="controls">
  <Button priority="secondary" link={`/${poll.id}`}>Back</Button>
</div>

<style>
  h1 {
    font-family: 'Urbanist';
    font-size: 3.25rem;
    font-weight: 900;
    margin-top: 8rem;
    word-wrap: break-word;
    hyphens: auto;
  }

  @media screen and (max-width: 700px) {
    h1 {
      font-size: 2.5rem;
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

  p {
    margin: 0;
  }

  .controls {
    margin-top: 5rem;
    display: flex;
    justify-content: flex-end;
  }
</style>
