<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$lib/components/Atoms/Button.svelte';
  import QrCode from '$lib/components/QRCode/QRCode.svelte';

  const link = `https://poll.matsku.dev/${$page.params.id}`;
</script>

<svelte:head>
  <title>Share poll</title>
</svelte:head>

<div class="relative flex flex-col items-center top-[50vh] -translate-y-1/2">
  <h1 class="font-extrabold text-5xl sm:text-6xl mb-4">Share</h1>

  <QrCode value={link} size={128} className="w-3/4 sm:w-1/2 max-w-[12rem]" />

  <input
    type="text"
    value={link}
    readonly
    class="px-4 py-2 rounded-md mt-4 bg-transparent w-full max-w-xs text-center"
    on:focus={(e) => e.currentTarget.select()}
  />

  <Button href="/{$page.params.id}">Go to poll</Button>
</div>
