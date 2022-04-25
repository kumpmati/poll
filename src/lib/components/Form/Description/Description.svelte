<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';

  export let value: string;
  export let inFocus: boolean;

  const dispatch = createEventDispatcher();

  let element;

  const handleKeyDown = (e) => {
    if (e.key !== 'Enter' || !e.shiftKey) return;

    dispatch('done');
    e.preventDefault();
  };

  // request focus on mount
  onMount(() => element.focus());
</script>

<div class="flex flex-col">
  {#if inFocus}
    <span class="font-extrabold text-neutral-500 dark:text-neutral-300">
      Description (optional)
    </span>
  {/if}

  <label>
    <textarea
      bind:this={element}
      bind:value
      on:keydown={handleKeyDown}
      class="bg-transparent text-lg p-1 w-full placeholder-neutral-100 dark:placeholder-neutral-600"
      placeholder="Optional description (supports Markdown)"
    />
  </label>
</div>
