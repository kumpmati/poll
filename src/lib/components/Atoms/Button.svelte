<script lang="ts">
  export let href = '';
  export let disabled = false;
  export let type: 'button' | 'submit' = 'button';
  export let className = '';

  const tag = !!href ? 'a' : 'button';
</script>

<svelte:element
  this={tag}
  {href}
  {type}
  disabled={disabled || null}
  class="font-extrabold flex flex-row gap-2 rounded-md
  justify-center py-3 px-8 w-max mt-6 mx-auto
  bg-neutral-200 hover:bg-neutral-300 disabled:hover:bg-neutral-200
  dark:bg-neutral-700 hover:dark:bg-neutral-600 disabled:hover:dark:bg-neutral-700
  disabled:opacity-50
  {className ?? ''}"
  on:click
>
  <slot />
</svelte:element>
