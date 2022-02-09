<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown';

  export let value = '';
</script>

<div class="markdown">
  <SvelteMarkdown source={value} />
</div>

<style>
  .markdown {
    color: var(--text-subtle);
  }

  .markdown :global(h1),
  .markdown :global(h2),
  .markdown :global(h3),
  .markdown :global(h4),
  .markdown :global(h5),
  .markdown :global(h6) {
    color: var(--text);
    font-family: 'Open Sans' !important;
    font-weight: 400;
  }

  .markdown :global(img) {
    width: 100%;
    border-radius: 0.25rem;
  }
</style>
