<script lang="ts">
	import type { ChoiceBuilderStore } from '$lib/stores/builder/choice';
	import { Button, OverflowMenu, OverflowMenuItem } from 'carbon-components-svelte';
	import {
		Calendar,
		Edit,
		Image,
		StringText,
		TextAlignCenter,
		TrashCan
	} from 'carbon-icons-svelte';
	import { createEventDispatcher } from 'svelte';
	import DateChoice from './DateChoice.svelte';
	import DateRangeChoice from './DateRangeChoice.svelte';
	import FreeTextChoice from './FreeTextChoice.svelte';
	import ImageChoice from './ImageChoice.svelte';
	import StringChoice from './StringChoice.svelte';

	export let builder: ChoiceBuilderStore<any, any>;
	export let allowedTypes = ['string', 'date', 'daterange', 'image', 'freetext'];

	const dispatch = createEventDispatcher();
</script>

<span>
	{#if allowedTypes.length > 1}
		<OverflowMenu iconDescription="Change choice type" title="Change choice type">
			<div slot="menu" class="menu">
				{#if $builder.type === 'string'}
					<StringText />
				{:else if $builder.type === 'date'}
					<Calendar />
				{:else if $builder.type === 'daterange'}
					<Calendar />
				{:else if $builder.type === 'image'}
					<Image />
				{:else if $builder.type === 'freetext'}
					<Edit />
				{/if}
			</div>

			{#if allowedTypes.includes('string')}
				<OverflowMenuItem text="Normal" on:click={() => ($builder.type = 'string')} />
			{/if}
			{#if allowedTypes.includes('date')}
				<OverflowMenuItem text="Date" on:click={() => ($builder.type = 'date')} />
			{/if}
			{#if allowedTypes.includes('daterange')}
				<OverflowMenuItem text="Date range" on:click={() => ($builder.type = 'daterange')} />
			{/if}
			{#if allowedTypes.includes('image')}
				<OverflowMenuItem text="Image" on:click={() => ($builder.type = 'image')} />
			{/if}
			{#if allowedTypes.includes('freetext')}
				<OverflowMenuItem text="Free text" on:click={() => ($builder.type = 'freetext')} />
			{/if}
		</OverflowMenu>
	{/if}

	{#if $builder.type === 'string'}
		<StringChoice {builder} />
	{:else if $builder.type === 'date'}
		<DateChoice {builder} />
	{:else if $builder.type === 'daterange'}
		<DateRangeChoice {builder} />
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
