<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let value: string;
  export let inFocus: boolean;

  const dispatch = createEventDispatcher();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Enter' || !value) return;

    e.preventDefault();
    dispatch('done');
  };
</script>

<label class="flex flex-col">
  {#if inFocus}
    <span class="font-extrabold text-neutral-500 dark:text-neutral-300"> Title </span>
  {/if}

  <!-- svelte-ignore a11y-autofocus -->
  <input
    autofocus
    bind:value
    required
    autocomplete="off"
    type="text"
    class="text-4xl p-2 pl-1 pr-1 font-extrabold font-main bg-transparent placeholder-neutral-100 dark:placeholder-neutral-600 outline-none transition-all"
    placeholder="Your title here"
    on:keydown={handleKeyDown}
  />
</label>
