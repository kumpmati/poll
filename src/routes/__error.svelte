<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = async ({ status, error }) => {
    return {
      props: {
        status,
        title: error.message
      }
    };
  };
</script>

<script lang="ts">
  export let status: number;
  export let title: string;
</script>

<svelte:head>
  <title>{title ?? 'Something went wrong'}</title>
</svelte:head>

<div class="grid place-content-center h-screen text-center">
  <h1 class="font-extrabold text-6xl mb-2">{status ?? 500}</h1>
  <p class="text-neutral-400 dark:text-neutral-500">{title ?? 'Something went wrong'}</p>

  <a href="/" class="mt-4">Home</a>
</div>
