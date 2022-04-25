<script lang="ts">
  import type { Choice, Poll } from '$lib/types/poll';
  import { fly } from 'svelte/transition';

  export let settings: Poll['settings'];
  export let choices: Choice[];

  let multipleChoice = false;

  $: {
    if (!multipleChoice) {
      settings.maxChoices = 1;
      settings.minChoices = 1;
    }
  }
</script>

<div class="flex flex-col gap-5 mt-4 sm:gap-2 min-h-[12rem]">
  <span class="font-extrabold text-neutral-300 dark:text-neutral-500"> Settings </span>

  <div class="flex flex-row gap-2 justify-between items-start">
    <p class="font-extrabold text-lg">Allow multiple submissions</p>

    <div class="flex gap-2">
      <label
        title="A single user can submit multiple times"
        class="pt-1 pb-1 w-20 cursor-pointer text-center rounded-md {settings.allowMultipleAnswers
          ? 'bg-neutral-200 dark:bg-neutral-700 font-extrabold'
          : null}"
      >
        Yes
        <input
          class="hidden"
          type="radio"
          name="mode"
          value={true}
          bind:group={settings.allowMultipleAnswers}
        />
      </label>
      <label
        title="A single user can only submit once"
        class="pt-1 pb-1 w-20 cursor-pointer text-center rounded-md {!settings.allowMultipleAnswers
          ? 'bg-neutral-200 dark:bg-neutral-700 font-extrabold'
          : null}"
      >
        No
        <input
          class="hidden"
          type="radio"
          name="mode"
          value={false}
          bind:group={settings.allowMultipleAnswers}
        />
      </label>
    </div>
  </div>

  <div class="flex flex-row gap-2 justify-between items-start">
    <p class="font-extrabold text-lg">Submission mode</p>

    <div class="flex gap-2">
      <label
        title="Users need to put the choices in a descending order of preference"
        class="pt-1 pb-1 w-20 text-center cursor-pointer rounded-md {settings.mode === 'order'
          ? 'bg-neutral-200 dark:bg-neutral-700 font-extrabold'
          : null}"
      >
        Order
        <input class="hidden" type="radio" name="mode" value="order" bind:group={settings.mode} />
      </label>

      <label
        title="Users are required to choose one or more answers"
        class="pt-1 pb-1 w-20 text-center cursor-pointer rounded-md {settings.mode === 'choice'
          ? 'bg-neutral-200 dark:bg-neutral-700 font-extrabold'
          : null}"
      >
        Choice
        <input class="hidden" type="radio" name="mode" value="choice" bind:group={settings.mode} />
      </label>
    </div>
  </div>

  <!-- Number of choices -->
  {#if settings.mode === 'choice'}
    <div
      transition:fly|local={{ y: -10, duration: 200 }}
      class="flex flex-row gap-2 justify-between items-start"
    >
      <p class="font-extrabold text-lg">Number of required choices</p>

      <div class="flex gap-2">
        <label
          title="Choose how many answers users need to select"
          class="pt-1 pb-1 w-20 text-center cursor-pointer rounded-md {multipleChoice
            ? 'bg-neutral-200 dark:bg-neutral-700 font-extrabold'
            : null}"
        >
          Range
          <input
            class="hidden"
            type="radio"
            name="multiple-choice"
            value={true}
            bind:group={multipleChoice}
          />
        </label>

        <label
          title="Users need to select exactly one (1) answer"
          class="pt-1 pb-1 w-20 text-center cursor-pointer rounded-md {!multipleChoice
            ? 'bg-neutral-200 dark:bg-neutral-700 font-extrabold'
            : null}"
        >
          Default
          <input
            class="hidden"
            type="radio"
            name="multiple-choice"
            value={false}
            bind:group={multipleChoice}
          />
        </label>
      </div>
    </div>
  {/if}

  <!-- Choice number settings -->
  {#if settings.mode === 'choice' && multipleChoice}
    <div
      transition:fly|local={{ y: -10, duration: 200 }}
      class="flex flex-row justify-center sm:justify-end gap-4"
    >
      <label class="flex flex-row items-center gap-2">
        Min
        <input
          type="number"
          min={0}
          max={settings.maxChoices}
          bind:value={settings.minChoices}
          class="rounded-md p-1 pr-0 pl-3 w-14 font-extrabold bg-neutral-200 dark:bg-neutral-700 text-base font-main"
        />
      </label>

      <label class="flex flex-row items-center gap-2">
        Max
        <input
          type="number"
          min={Math.max(settings.minChoices, 1)}
          max={choices.length}
          bind:value={settings.maxChoices}
          class="rounded-md p-1 pr-0 pl-3 w-14 font-extrabold bg-neutral-200 dark:bg-neutral-700 text-base font-main"
        />
      </label>
    </div>
  {/if}
</div>
