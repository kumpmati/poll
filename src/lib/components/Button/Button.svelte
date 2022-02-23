<script lang="ts">
  import Refresh from '../Icons/refresh.svelte';

  export let priority: 'main' | 'secondary';
  export let loading = false;
  export let disabled = false;
  export let link = '';
</script>

{#if link}
  <a class={`button ${priority}`} on:click href={link} {disabled}>
    <span class="content" class:hidden={loading}>
      <slot />
    </span>
    {#if loading}
      <span class="loader">
        <span class="spinner">
          <Refresh />
        </span>
      </span>
    {/if}
  </a>
{:else}
  <button type="button" class={`button ${priority}`} on:click {disabled}>
    <span class="content" class:hidden={loading}>
      <slot />
    </span>
    {#if loading}
      <span class="loader">
        <span class="spinner">
          <Refresh />
        </span>
      </span>
    {/if}
  </button>
{/if}

<style>
  .button {
    position: relative;
    font-size: 1.125rem !important;
    font-family: 'Open Sans';
    appearance: none;
    border: none;
    border-radius: 0.25rem;
    padding: 0.9rem 2rem;
    display: flex;
    height: fit-content;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    color: var(--text);
    background: rgba(128, 128, 128, 0.25);
    overflow: hidden;
    text-decoration: none;
  }

  .button.main {
    color: #eee;
    background: var(--blue);
    padding: 0.9rem 2.75rem;
  }

  .button:disabled {
    cursor: not-allowed;
    opacity: 0.75;
  }

  .button.main:not(:disabled):hover {
    background: var(--blue-subtle);
  }

  .button:not(:disabled):hover {
    background: rgba(128, 128, 128, 0.5);
    border-color: #ddd;
    cursor: pointer;
  }

  .button.wide {
    width: 100%;
  }

  .loader {
    position: absolute;
    width: 100%;
    height: 100%;
    display: grid;
    place-content: center;
  }

  .spinner {
    display: grid;
    place-content: center;
    animation: spin 1s both infinite;
  }

  .content {
    display: contents;
  }

  .content.hidden {
    visibility: hidden;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
