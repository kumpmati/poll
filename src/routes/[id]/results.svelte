<script lang="ts">
  import type { Poll, Results } from '$lib/types/poll';
  import ChoiceStats from '$lib/components/Stats/ChoiceStats.svelte';
  import OrderStats from '$lib/components/Stats/OrderStats.svelte';
  import { calculateChoiceStats, calculateOrderStats } from '$lib/utils/stats';
  import { connectSocketIO } from '$lib/utils/websocket';
  import { onMount } from 'svelte';
  import Markdown from '$lib/components/Markdown/Markdown.svelte';

  export let poll: Poll;
  export let results: Results;

  let stats =
    poll.settings.mode === 'order'
      ? calculateOrderStats(poll, results)
      : calculateChoiceStats(poll, results);

  onMount(() => {
    // listen to updates to results
    connectSocketIO(results, poll.id).subscribe((newResults) => {
      if (poll.settings.mode === 'order') {
        stats = calculateOrderStats(poll, newResults);
      } else {
        stats = calculateChoiceStats(poll, newResults);
      }
    });
  });
</script>

<svelte:head>
  <title>Results - {poll.title}</title>
</svelte:head>

<div class="relative mt-[10rem] mb-20">
  <h1 class="font-extrabold text-4xl mb-4 text-neutral-700 dark:text-neutral-300">{poll.title}</h1>

  {#if poll.description}
    <Markdown value={poll.description} />
  {/if}

  <div class="flex justify-between items-center mt-4 mb-8">
    <p class="font-extrabold text-neutral-300">
      {#if poll.settings.mode === 'choice'}
        Choose
        {#if poll.settings.maxChoices === 1}
          one
        {:else if poll.settings.maxChoices !== poll.settings.minChoices}
          {poll.settings.minChoices}-{poll.settings.maxChoices}
        {:else}
          {poll.settings.maxChoices}
        {/if}
      {:else}
        Order
      {/if}
    </p>

    <p class="text-right text-neutral-400 dark:text-neutral-500">
      <span class="text-lg font-extrabold text-neutral-600 dark:text-neutral-300"
        >{stats.totalSubmissions}</span
      > submissions
    </p>
  </div>

  {#if poll.settings.mode === 'order'}
    <OrderStats {poll} {stats} />
  {:else}
    <ChoiceStats {poll} {stats} />
  {/if}
</div>
