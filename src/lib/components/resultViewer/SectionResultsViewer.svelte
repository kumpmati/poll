<script lang="ts">
	import type { PollSection } from '$lib/schemas/poll';
	import { sectionTypeLabel } from '$lib/utils';
	import type { PollStatistics } from '$lib/utils/statistics';
	import { AccordionItem } from 'carbon-components-svelte';
	import BarResults from './type/BarResults.svelte';
	import OrderResults from './type/OrderResults.svelte';
	import UnionResults from './type/UnionResults.svelte';

	export let section: PollSection;
	export let statistics: PollStatistics;
	export let open: boolean;
</script>

<AccordionItem title={section.title} {open}>
	<svelte:fragment slot="title">
		<h4>{section.title}</h4>
		<p>{sectionTypeLabel(section.type)}</p>
	</svelte:fragment>

	{#if section.type === 'order'}
		<OrderResults {section} {statistics} />
	{:else if section.type === 'dates'}
		<UnionResults {statistics} />
	{:else}
		<BarResults {section} {statistics} />
	{/if}
</AccordionItem>

<style>
	p {
		opacity: 0.5;
		font-size: 12px;
	}
</style>
