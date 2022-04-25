<script lang="ts">
  import MoreVertical from '$lib/components/Icons/more-vertical.svelte';
  import X from '$lib/components/Icons/x.svelte';
  import type { Choice } from '$lib/types/poll';
  import { createEventDispatcher, onMount } from 'svelte';

  export let index: number;
  export let choice: Choice;
  export let canDelete: boolean;

  const dispatch = createEventDispatcher();

  const handleDeleteClick = () => {
    if (canDelete) dispatch('delete', choice.id);
  };

  let element;

  // focus to the text field when mounted
  onMount(() => element?.focus());
</script>

<div class="text-neutral-500 dark:text-neutral-200"><MoreVertical /></div>
<input
  type="text"
  class="w-full p-3 bg-transparent outline-none"
  required
  placeholder="Choice {index + 1}"
  on:keydown={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
  bind:value={choice.text}
  bind:this={element}
/>

{#if canDelete}
  <button type="button" class="absolute right-4" on:click={handleDeleteClick}>
    <X />
  </button>
{/if}
