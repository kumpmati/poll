<script lang="ts">
	import type { PollChoice, PollResponseItem } from '$lib/schemas/poll';
	import { ClickableTile, Modal } from 'carbon-components-svelte';
	import { CheckmarkFilled } from 'carbon-icons-svelte';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import DateChoice from './DateChoice.svelte';
	import DateRangeChoice from './DateRangeChoice.svelte';
	import FreeTextChoice from './FreeTextChoice.svelte';
	import ImageChoice from './ImageChoice.svelte';
	import StringChoice from './StringChoice.svelte';

	export let choice: PollChoice;

	// arbitrary data provided by the user when answering the poll
	export let userData: any;
	export let selected: boolean;

	const dispatch = createEventDispatcher<{
		update: PollResponseItem;
		select: never;
	}>();

	let open = false;
	let imageLabel = choice.id.substring(0, 4).toUpperCase();
</script>

<ClickableTile
	on:click={() => dispatch('select')}
	style="width: 100%; border: 1px solid transparent; border-color: {selected
		? '#fff'
		: 'transparent'}"
>
	<span class="content">
		{#if choice.type === 'string'}
			<StringChoice {choice} />
		{:else if choice.type === 'date'}
			<DateChoice {choice} />
		{:else if choice.type === 'daterange'}
			<DateRangeChoice {choice} />
		{:else if choice.type === 'image'}
			<ImageChoice {imageLabel} bind:open />
		{:else if choice.type === 'freetext'}
			<FreeTextChoice {choice} bind:value={userData} />
		{:else}
			Unknown choice type 🙁
		{/if}

		{#if selected}
			<span class="icon" transition:fly|local={{ duration: 200, x: 5 }}>
				<CheckmarkFilled />
			</span>
		{/if}
	</span>
</ClickableTile>

{#if open && choice.type === 'image'}
	<Modal bind:open passiveModal modalHeading="Image (#{imageLabel})" size="sm">
		<img loading="lazy" src={choice.data} alt={null} />
	</Modal>
{/if}

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

	img {
		width: 99%;
		height: 98%;
		object-fit: contain;
	}
</style>
