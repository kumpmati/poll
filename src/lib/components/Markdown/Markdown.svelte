<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown';

  export let value: string;
</script>

<div class="md font-main text-neutral-600 dark:text-neutral-400 text-lg py-4">
  <SvelteMarkdown source={value} />
</div>

<style>
  .md :global(h1),
  .md :global(h2),
  .md :global(h3),
  .md :global(h4),
  .md :global(h5),
  .md :global(h6) {
    font-weight: 900;
    line-height: 1;
    margin-block: 0.5rem;
  }

  .md :global(h1) {
    font-size: 30px !important;
  }

  .md :global(h2) {
    font-size: 26px !important;
  }

  .md :global(h3) {
    font-size: 22px !important;
  }

  .md :global(h4) {
    font-size: 20px !important;
  }

  .md :global(h5) {
    font-size: 18px !important;
  }

  .md :global(h6) {
    font-size: 14px !important;
  }
</style>
