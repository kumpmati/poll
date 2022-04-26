<script lang="ts">
  export let href = '';
  export let disabled = false;
  export let type: 'button' | 'submit' = 'button';
  export let className = '';
  export let size: 'small' | 'large' = 'large';

  const tag = href ? 'a' : 'button';
</script>

<svelte:element
  this={tag}
  {href}
  {type}
  disabled={disabled || null}
  class="font-extrabold font-main flex flex-row items-center gap-2 rounded-md
  justify-center {size === 'large' ? 'py-3 px-8' : 'px-1 py-1 text-sm'} w-max
	text-neutral-800 dark:text-neutral-300
  bg-neutral-200 hover:bg-neutral-300 disabled:hover:bg-neutral-200
  dark:bg-neutral-700 hover:dark:bg-neutral-600 disabled:hover:dark:bg-neutral-700
  disabled:opacity-50
  {className ?? ''}"
  on:click
>
  <slot />
</svelte:element>
