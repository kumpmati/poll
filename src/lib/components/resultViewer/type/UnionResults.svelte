<script lang="ts">
	import type { PollStatistics } from '$lib/utils/statistics';
	import { Button } from 'carbon-components-svelte';
	import { JoinFull, JoinInner } from 'carbon-icons-svelte';
	import ChoiceRenderer from '../ChoiceRenderer.svelte';

	export let statistics: PollStatistics;

	let showAllDates = false;
	let submittedDates = Object.keys(statistics.numDates);

	let sortDescending = submittedDates.sort((a, b) => {
		const amountA = statistics.numDates[a] ?? 0;
		const amountB = statistics.numDates[b] ?? 0;

		return amountB - amountA;
	});

	$: dates = showAllDates
		? sortDescending
		: sortDescending.filter((d) => statistics.numDates[d] > 1);

	let maxAmount = Math.max(...Object.values(statistics.numDates));
</script>

<span>
	<p>{showAllDates ? 'Showing all dates' : 'Showing only common dates'}</p>
	<Button
		kind="ghost"
		size="small"
		on:click={() => (showAllDates = !showAllDates)}
		icon={showAllDates ? JoinFull : JoinInner}
	>
		{showAllDates ? 'Show common' : 'Show all'}
	</Button>
</span>

<br />
<br />

<ul>
	{#if dates.length > 0}
		{#each dates as date, index}
			{@const num = statistics.numDates[date] ?? 0}
			<li class="item" style:width="{(num / maxAmount) * 100}%">
				<p>#{index + 1}</p>
				<p>({num})</p>

				<ChoiceRenderer value={date} type="date" />
			</li>
		{/each}
	{:else}
		<p>No compatible dates found!</p>{/if}
</ul>

<style>
	span {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	ul {
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.item {
		padding: 8px;
		display: flex;
		align-items: center;
		background-color: rgb(50, 50, 50);
		gap: 8px;
		border-radius: 2px;
	}

	p {
		opacity: 0.6;
		font-size: 12px;
	}
</style>
