<script lang="ts">
  import type { Choice } from '$lib/types/poll';
  import { flip } from 'svelte/animate';
  import { nanoid } from 'nanoid';
  import { dndzone } from 'svelte-dnd-action';
  import Plus from '$lib/components/Icons/plus.svelte';
  import ChoiceItem from './ChoiceItem.svelte';

  export let choices: Choice[];
  export let inFocus: boolean;

  const onConsider = (e) => {
    choices = e.detail.items;
  };

  const onFinalize = (e) => {
    choices = e.detail.items;
  };

  const onAddChoice = () => {
    choices = [...choices, { id: nanoid(), text: '' }];
  };

  const onDeleteChoice = (e: CustomEvent<string>) => {
    choices = choices.filter((c) => c.id !== e.detail);
  };
</script>

<div class="flex flex-col gap-2">
  {#if inFocus}
    <span class="font-extrabold text-neutral-500 dark:text-neutral-300"> Choices </span>
  {/if}

  <ul
    class="flex flex-col gap-2 rounded-md"
    use:dndzone={{ items: choices, dropTargetStyle: {} }}
    on:consider={onConsider}
    on:finalize={onFinalize}
  >
    {#each choices as choice, index (choice.id)}
      <li
        animate:flip={{ duration: 200 }}
        class="relative flex p-0 pl-0 rounded-md w-full items-center overflow-hidden bg-neutral-200 dark:bg-neutral-700"
      >
        <ChoiceItem bind:choice {index} canDelete={choices.length > 1} on:delete={onDeleteChoice} />
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
