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
  <span
    class="font-extrabold {inFocus
      ? 'text-neutral-500 dark:text-neutral-300'
      : 'text-neutral-300 dark:text-neutral-500'}"
  >
    {inFocus ? 'Add a title' : 'Title'}
  </span>

  <!-- svelte-ignore a11y-autofocus -->
  <input
    autofocus
    bind:value
    required
    autocomplete="off"
    type="text"
    class="appearance-none text-4xl p-2 pl-1 pr-1 font-extrabold font-main bg-transparent placeholder-neutral-100 dark:placeholder-neutral-600"
    placeholder="Your title here"
    on:keydown={handleKeyDown}
  />
</label>
