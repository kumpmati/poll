<script lang="ts">
  import type { ChoiceMode } from '$lib/types/poll';
  import { createEventDispatcher, onMount } from 'svelte';

  const dispatch = createEventDispatcher();

  let value: ChoiceMode = {
    type: 'choice',
    minChoices: 0,
    maxChoices: 1
  };

  $: {
    // make sure minChoices never exceeds maxChoices
    if (value.minChoices > value.maxChoices) {
      value.maxChoices = value.minChoices;
    }
  }

  $: dispatch('changed', value);
  onMount(() => dispatch('changed', value));
</script>

<div>
  <label>
    <input type="number" min={0} bind:value={value.minChoices} />
    Min
  </label>

  <label>
    <input type="number" min={1} bind:value={value.maxChoices} />
    Max
  </label>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 1rem;
    font-size: 1.35rem;
  }

  input {
    width: 5ch;
    font-size: 1.35rem;
  }
</style>
