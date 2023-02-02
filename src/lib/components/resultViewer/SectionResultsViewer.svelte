<script lang="ts">
	import type { PollSection } from '$lib/schemas/poll';
	import type { PollStatistics } from '$lib/utils/statistics';
	import BarResults from './type/BarResults.svelte';
	import OrderResults from './type/OrderResults.svelte';
	import UnionResults from './type/UnionResults.svelte';

	export let section: PollSection;
	export let statistics: PollStatistics;
</script>

{#if section.type === 'order'}
	<OrderResults {section} {statistics} />
{:else if section.type === 'dates'}
	<UnionResults {statistics} />
{:else}
	<BarResults {section} {statistics} />
{/if}
