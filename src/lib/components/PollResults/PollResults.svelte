<script lang="ts">
  import type { Poll, Results } from '$lib/types/poll';
  import ChoiceResults from './Modes/ChoiceResults.svelte';
  import OrderResults from './Modes/OrderResults.svelte';

  export let poll: Poll;
  export let results: Results;
</script>

{#if poll.mode.type === 'choice'}
  <ChoiceResults {poll} {results} />
{:else if poll.mode.type === 'order'}
  <OrderResults {poll} {results} />
{/if}
