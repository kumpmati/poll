<script lang="ts">
  import type { Choice, Poll } from '$lib/types/poll';
  import { fly } from 'svelte/transition';
  import SettingRow from './SettingRow.svelte';

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

<div class="flex flex-col gap-5 mt-4 sm:gap-2 min-h-[14rem]">
  <span class="font-extrabold text-neutral-300 dark:text-neutral-500"> Settings </span>

  <!-- Allow multiple submissions -->
  <SettingRow
    bind:current={settings.allowMultipleAnswers}
    options={[
      { label: 'Yes', value: true, title: 'A single user can submit multiple times' },
      { label: 'No', value: false, title: 'A single user can only submit once' }
    ]}
  >
    Allow multiple submissions
  </SettingRow>

  <!-- Shuffle choices -->
  <SettingRow
    bind:current={settings.shuffleChoices}
    options={[
      { label: 'Yes', value: true },
      { label: 'No', value: false }
    ]}
  >
    Shuffle choices
  </SettingRow>

  <!-- Submission mode -->
  <SettingRow
    bind:current={settings.mode}
    options={[
      {
        value: 'order',
        label: 'Order',
        title: 'Users need to put the choices in a descending order of preference'
      },
      {
        value: 'choice',
        label: 'Choice',
        title: 'Users are required to choose one or more answers'
      }
    ]}>Submission mode</SettingRow
  >

  {#if settings.mode === 'choice'}
    <span transition:fly|local={{ y: -10, duration: 200 }} class="">
      <SettingRow
        bind:current={multipleChoice}
        options={[
          { value: true, label: 'Range', title: 'Choose how many answers users need to select' },
          { value: false, label: 'Default', title: 'Users need to select exactly one (1) answer' }
        ]}
      >
        Number of required choices
      </SettingRow>
    </span>
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
