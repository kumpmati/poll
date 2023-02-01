<script lang="ts">
	import type { PollChoice } from '$lib/schemas/poll';
	import { ClickableTile } from 'carbon-components-svelte';
	import { CheckmarkFilled } from 'carbon-icons-svelte';
	import { fly } from 'svelte/transition';
	import StringChoice from './StringChoice.svelte';

	export let choice: PollChoice;
	export let selected: boolean;
</script>

<ClickableTile
	on:click
	style="border: 1px solid transparent; border-color: {selected ? '#fff' : 'transparent'}"
>
	<span class="content">
		{#if choice.type === 'string'}
			<StringChoice {choice} />
		{:else if choice.type === 'date'}
			<StringChoice {choice} />
		{:else}
			unknown choice
		{/if}

		{#if selected}
			<span class="icon" transition:fly|local={{ duration: 200, x: 5 }}>
				<CheckmarkFilled />
			</span>
		{/if}
	</span>
</ClickableTile>

<br />

<style>
	.content {
		position: relative;
		width: 100%;
		display: flex;
	}

	.icon {
		position: absolute;
		right: 0;
		top: 0;
	}
</style>
