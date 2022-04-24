<script lang="ts">
  import type { Choice } from '$lib/types/poll';
  import { flip } from 'svelte/animate';
  import { nanoid } from 'nanoid';
  import { dndzone } from 'svelte-dnd-action';
  import X from '../Icons/x.svelte';
  import MoreVertical from '../Icons/more-vertical.svelte';
  import Plus from '../Icons/plus.svelte';

  export let choices: Choice[];

  const onConsider = (e) => {
    choices = e.detail.items;
  };

  const onFinalize = (e) => {
    choices = e.detail.items;
  };

  const onAddChoice = () => {
    choices = [...choices, { id: nanoid(), text: '' }];
  };

  const onDeleteChoice = (id: string) => {
    choices = choices.filter((c) => c.id !== id);
  };
</script>

<div class="flex flex-col gap-2">
  <span class="font-extrabold text-neutral-400 dark:text-neutral-500">Choices</span>
  <ul
    class="flex flex-col gap-2 rounded-md"
    use:dndzone={{ items: choices, dropTargetStyle: {} }}
    on:consider={onConsider}
    on:finalize={onFinalize}
  >
    {#each choices as choice (choice.id)}
      <li
        animate:flip={{ duration: 200 }}
        class="relative flex p-0 pl-0 rounded-md w-full items-center overflow-hidden bg-neutral-200 dark:bg-neutral-700"
      >
        <div class="text-neutral-500 dark:text-neutral-200"><MoreVertical /></div>
        <input
          type="text"
          class="w-full p-3 bg-transparent outline-none"
          required
          on:keydown={(e) => (e.key === 'Enter' ? e.preventDefault() : null)}
          bind:value={choice.text}
        />

        {#if choices.length > 1}
          <button type="button" class="absolute right-4" on:click={() => onDeleteChoice(choice.id)}>
            <X />
          </button>
        {/if}
      </li>
    {/each}
  </ul>

  <button
    type="button"
    class="w-full bg-neutral-200 dark:bg-neutral-700 grid place-content-center p-3 rounded-md hover:bg-neutral-300 hover:dark:bg-neutral-600"
    on:click={onAddChoice}
  >
    <Plus />
  </button>
</div>
