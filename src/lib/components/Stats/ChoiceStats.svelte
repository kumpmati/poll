<script lang="ts">
  import type { Poll } from '$lib/types/poll';
  import { getChoiceModeSortedOptions } from '$lib/utils/sort';
  import type { Stats } from '$lib/utils/stats';
  import { flip } from 'svelte/animate';

  export let poll: Poll;
  export let stats: Stats;

  $: choices = getChoiceModeSortedOptions(poll, stats);
</script>

<ul class="flex flex-col gap-4 p-0">
  {#each choices as choice (choice.id)}
    {@const stat = stats[choice.id]}
    <li animate:flip={{ duration: 200 }} class="relative flex flex-col">
      <p class="text-lg m-0 text-neutral-700 dark:text-neutral-200">
        {choice.text}
      </p>

      <div
        class="relative flex items-center gap-2 py-2 px-4 text-neutral-100 bg-slate-200 dark:bg-neutral-900 rounded-md"
      >
        <p class="font-extrabold w-max text-xl z-10">
          {stats.totalSelectedChoices === 0
            ? 0
            : ((stat / stats.totalSelectedChoices) * 100).toFixed(0)} %
        </p>
        <p class="text-neutral-300 z-10">({stat})</p>

        <!-- Bar -->
        <div
          class="absolute left-0 top-0 w-full h-full  flex flex-row items-center rounded-md bg-slate-500 transition-all"
          style:width="{stats.totalSelectedChoices === 0
            ? 0
            : (stat / stats.totalSelectedChoices) * 100}%"
        />
      </div>
    </li>
  {/each}
</ul>
