<script lang="ts">
  import type { Choice, Poll } from '$lib/types/poll';
  import { createEventDispatcher } from 'svelte';
  import { dndzone } from 'svelte-dnd-action';
  import Check from '../Icons/check.svelte';
  import { fly } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import Refresh from '../Icons/refresh.svelte';

  export let poll: Poll;
  export let loading: boolean;

  let selections = poll?.settings?.mode === 'order' ? [...poll.choices] : [];
  $: selectionsFull = selections.length >= poll.settings.maxChoices;

  const dispatch = createEventDispatcher();

  const onSubmit = () => {
    dispatch('submit', selections);
  };

  const onConsider = (e) => {
    selections = e.detail.items;
  };
  const onFinalize = (e) => {
    selections = e.detail.items;
  };

  const onClickItem = (item: Choice) => {
    // clicked item already selected, remove selection
    if (selections.find((s) => s.id === item.id)) {
      selections = selections.filter((s) => s.id !== item.id);
      return;
    }

    // cannot select any more, max amount reached
    if (selectionsFull) return;

    // append item to selection array
    selections = [...selections, item];
  };
</script>

<div class="flex flex-col gap-2 mt-6">
  {#if poll.settings.mode === 'order'}
    <!-- Order mode -->
    <p class="font-extrabold text-xl">Drag the choices into order</p>

    <ul
      class="flex flex-col gap-2"
      use:dndzone={{ items: selections, dropTargetStyle: {} }}
      on:consider={onConsider}
      on:finalize={onFinalize}
    >
      {#each selections as selection, index (selection.id)}
        <li
          animate:flip={{ duration: 200 }}
          class="relative flex flex-row gap-3 p-3 text-left text-lg rounded-md w-full items-center overflow-hidden bg-neutral-200 dark:bg-neutral-700"
        >
          <p class="font-extrabold text-2xl w-8 text-center">{index + 1}</p>
          {selection.text}
        </li>
      {/each}
    </ul>
  {:else}
    <!-- Choice mode -->
    <p class="font-extrabold text-xl">
      Choose
      {#if poll.settings.maxChoices === 1}
        one
      {:else if poll.settings.maxChoices !== poll.settings.minChoices}
        {poll.settings.minChoices}-{poll.settings.maxChoices}
      {:else}
        {poll.settings.maxChoices}
      {/if}
    </p>

    <ul class="flex flex-col gap-2">
      {#each poll.choices as choice (choice.id)}
        {@const selected = !!selections.find((s) => s.id === choice.id)}
        <li>
          <button
            disabled={selectionsFull && !selected}
            on:click={() => onClickItem(choice)}
            class="
              relative flex flex-row gap-3 py-3 px-4
              text-left text-lg rounded-md w-full items-center
              overflow-hidden disabled:opacity-50 transition-all
              hover:bg-neutral-100 hover:dark:bg-neutral-900
              disabled:hover:bg-transparent
              {selected
              ? 'bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-200 hover:dark:bg-neutral-700'
              : ''}"
          >
            {#if selections.find((s) => s.id === choice.id)}
              <span in:fly|local={{ duration: 200, x: -10 }}>
                <Check />
              </span>
            {/if}
            {choice.text}
          </button>
        </li>
      {/each}
    </ul>
  {/if}

  <button
    on:click={onSubmit}
    type="button"
    disabled={selections.length < poll.settings.minChoices || loading}
    class="font-extrabold flex flex-row gap-2 justify-center py-3 px-8 pr-10 w-max mt-6 mx-auto bg-neutral-200 dark:bg-neutral-700 rounded-md disabled:opacity-50"
  >
    {#if loading}
      <span class="spinner"><Refresh /></span> Submitting
    {:else if selections.length < poll.settings.minChoices}
      {`Choose ${poll.settings.minChoices - selections.length} more`}
    {:else}
      <Check />
      Submit
    {/if}
  </button>
</div>

<style>
  .spinner {
    animation: spin 1s infinite both;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
