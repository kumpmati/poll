<script lang="ts">
  export let value = '';
  export let required = false;
  export let placeholder = '';
  export let invalid = false;
  export let className = '';
  export let size: 'normal' | 'large' = 'normal';
  export let autofocus = false;
</script>

<!-- svelte-ignore a11y-autofocus -->
<input
  type="text"
  class={`${className} ${size}`}
  class:invalid
  {required}
  bind:value
  {placeholder}
  {autofocus}
/>

<style>
  input {
    font-size: 1.1rem;
    font-family: 'Open Sans';
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    border-radius: 0.25rem;
    border: 2px solid transparent;
    background: rgba(128, 128, 128, 0.1);
    color: currentColor;

    transition: box-shadow 200ms;
  }

  input:focus {
    outline: none;
    border-color: #888;
    background: rgba(128, 128, 128, 0.2);
  }

  input.large {
    padding: 1em !important;
    font-size: 1.35rem !important;
  }

  input.invalid {
    border: 2px solid var(--red);
  }

  input.invalid:focus {
    box-shadow: 0 0 0 5px var(--red-subtle);
  }
</style>
