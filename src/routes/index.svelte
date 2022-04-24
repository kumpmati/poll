<script context="module">
  export const prerender = true;
</script>

<script lang="ts">
  import { goto } from '$app/navigation';

  import Form from '$lib/components/Form/Form.svelte';
  import type { Poll } from '$lib/types/poll';
  import { createPoll } from '$lib/utils/api';

  let loading = false;

  const onSubmit = async (e: CustomEvent<Poll>) => {
    loading = true;
    const response = await createPoll(e.detail);
    loading = false;

    if (response.id) {
      await goto(`/${response.id}/share`);
    } else {
      console.error('something went wrong', response);
    }
  };
</script>

<svelte:head>
  <title>poll</title>
</svelte:head>

<div class="relative mt-[10rem] mb-20">
  <Form on:submit={onSubmit} {loading} />
</div>
