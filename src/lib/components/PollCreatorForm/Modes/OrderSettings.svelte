<script lang="ts">
  import type { OrderMode } from '$lib/types/poll';
  import { createEventDispatcher, onMount } from 'svelte';

  const dispatch = createEventDispatcher();

  let value: OrderMode = {
    type: 'order'
  };

  $: dispatch('changed', value);
  onMount(() => dispatch('changed', value));
</script>
