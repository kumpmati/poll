<script lang="ts">
	import type { ChoiceBuilderStore } from '$lib/stores/builder/choice';
	import { Button, OverflowMenu, OverflowMenuItem } from 'carbon-components-svelte';
	import { Calendar, Image, StringText, TextAlignCenter, TrashCan } from 'carbon-icons-svelte';
	import { createEventDispatcher } from 'svelte';
	import DateChoice from './DateChoice.svelte';
	import FreeTextChoice from './FreeTextChoice.svelte';
	import ImageChoice from './ImageChoice.svelte';
	import StringChoice from './StringChoice.svelte';

	export let builder: ChoiceBuilderStore<any, any>;

	const dispatch = createEventDispatcher();
</script>

<span>
	<OverflowMenu iconDescription="Change field type">
		<div slot="menu" class="menu">
			{#if $builder.type === 'string'}
				<StringText />
			{:else if $builder.type === 'date'}
				<Calendar />
			{:else if $builder.type === 'image'}
				<Image />
			{:else if $builder.type === 'freetext'}
				<TextAlignCenter />
			{/if}
		</div>
		<OverflowMenuItem text="Normal" on:click={() => ($builder.type = 'string')} />
		<OverflowMenuItem text="Date" on:click={() => ($builder.type = 'date')} />
		<OverflowMenuItem text="Image" on:click={() => ($builder.type = 'image')} />
		<OverflowMenuItem text="Free text" on:click={() => ($builder.type = 'freetext')} />
	</OverflowMenu>

	{#if $builder.type === 'string'}
		<StringChoice {builder} />
	{:else if $builder.type === 'date'}
		<DateChoice {builder} />
	{:else if $builder.type === 'image'}
		<ImageChoice {builder} />
	{:else if $builder.type === 'freetext'}
		<FreeTextChoice {builder} />
	{/if}

	<Button
		size="field"
		kind="danger-ghost"
		on:click={() => dispatch('delete', $builder.id)}
		icon={TrashCan}
		iconDescription="Delete"
	/>
</span>

<style>
	span {
		display: flex;
	}

	.menu {
		width: 40px !important;
		color: #f4f4f4;
	}
</style>
