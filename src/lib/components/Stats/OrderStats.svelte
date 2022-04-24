<script lang="ts">
  import type { Poll } from '$lib/types/poll';
  import { getOrderModeSortedOptions } from '$lib/utils/sort';
  import type { Stats } from '$lib/utils/stats';
  import { flip } from 'svelte/animate';

  export let poll: Poll;
  export let stats: Stats;

  $: choices = getOrderModeSortedOptions(poll, stats);
</script>

<ul class="flex flex-col gap-4">
  {#each choices as choice, index (choice.id)}
    {@const stat = stats[choice.id]}
    <li
      animate:flip={{ duration: 200 }}
      class="grid grid-cols-[auto_1fr_auto] gap-4 items-center rounded-md"
    >
      <p
        class="grid place-content-center rounded-md min-w-12 w-12 h-12 text-2xl font-extrabold bg-neutral-200 dark:bg-neutral-800"
      >
        {index + 1}
      </p>

      <p class="text-lg flex shrink">
        {choice.text}
      </p>

      <p class="flex items-center gap-2 text-sm dark:text-neutral-500">
        <span class="text-lg font-extrabold dark:text-neutral-300">{stat}</span> points
      </p>
    </li>
  {/each}
</ul>
