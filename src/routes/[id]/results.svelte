<script lang="ts">
  import type { Poll, Results } from '$lib/types/poll';
  import ChoiceStats from '$lib/components/Stats/ChoiceStats.svelte';
  import OrderStats from '$lib/components/Stats/OrderStats.svelte';
  import { calculateChoiceStats, calculateOrderStats } from '$lib/utils/stats';
  import { connectSocketIO } from '$lib/utils/websocket';
  import { onMount } from 'svelte';

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

<div class="relative top-[50vh] -translate-y-1/2">
  <h1 class="font-extrabold text-4xl mb-10 text-neutral-700 dark:text-neutral-300">{poll.title}</h1>

  <p class="text-right text-neutral-400 dark:text-neutral-500">
    <span class="text-lg font-extrabold text-neutral-600 dark:text-neutral-300"
      >{stats.totalSubmissions}</span
    > submissions
  </p>

  {#if poll.settings.mode === 'order'}
    <OrderStats {poll} {stats} />
  {:else}
    <ChoiceStats {poll} {stats} />
  {/if}
</div>
