<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import More from '../Icons/more-vertical.svelte';
	import Trash from '../Icons/trash.svelte';

	export let value: string = '';
	export let placeholder: string = '';
	export let invalid: boolean = false;
	export let required: boolean = false;
	export let canDelete: boolean = false;

	const dispatch = createEventDispatcher();
</script>

<div class="option" class:invalid class:image={value.startsWith('http')}>
	<div class="drag-handler"><More /></div>

	<input type="text" {required} bind:value {placeholder} on:keyup|preventDefault />

	{#if value.startsWith('http')}
		<img class="image-preview" src={value} alt="" />
	{/if}

	<button disabled={!canDelete} class="delete" type="button" on:click={() => dispatch('delete')}>
		<Trash />
	</button>
</div>

<style>
	.option {
		width: 100%;
		position: relative;
		border: 2px solid transparent;
		border-radius: 0.35rem;
		overflow: hidden;
		display: flex;

		transition: box-shadow 200ms;
	}

	.option.image {
		height: 6rem;
	}

	.option .image-preview {
		position: absolute;
		height: 6rem;
		right: 4rem;
		pointer-events: none;
		opacity: 0.95;
	}

	.option.invalid {
		border-color: var(--red);
	}

	.option:focus-within {
		border-color: #888;
	}

	.option.invalid:focus-within {
		border-color: var(--red);
		box-shadow: 0 0 0 5px var(--red-subtle);
	}

	input {
		width: 100%;
		border: none;
		outline: none;
		background: rgba(128, 128, 128, 0.1);
		color: var(--text);
		padding: 1rem;
		padding-right: 4rem;
		font-size: 1rem;
		font-family: 'Open Sans';
	}

	.drag-handler {
		left: 0;
		min-height: 4rem;
		padding: 0 0.15rem;
		background: rgba(128, 128, 128, 0.2);
		color: currentColor;
		display: grid;
		place-content: center;
		border-right: 1px solid rgba(0, 0, 0, 0.05);

		transition: padding 200ms;
	}

	.drag-handler:hover {
		filter: brightness(0.95);
	}

	.delete {
		width: 3.5rem;
		height: calc(100% - 0.5rem);
		font-size: 1.5rem;
		display: grid;
		place-content: center;
		border: none;
		background: none;
		border-radius: 0.125rem;
		margin: 0.25rem;
		color: #888;
		position: absolute;
		right: 0;
		top: 0;
	}

	.delete:disabled {
		visibility: hidden;
	}

	.delete:not(:disabled):hover {
		background: rgba(238, 238, 238, 0.1);
		color: currentColor;
		cursor: pointer;
	}
</style>
