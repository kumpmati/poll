<script lang="ts">
	import type { PollSection } from '$lib/schemas/poll';
	import type { PollStatistics } from '$lib/utils/statistics';
	import ChoiceRenderer from '../ChoiceRenderer.svelte';

	export let section: PollSection;

	export let statistics: PollStatistics;

	const max = Math.max(...Object.values(statistics.choiceAnswerIndexTotal));

	const sortedByAscending = section.choices.sort((a, b) => {
		const amountA = statistics.choiceAnswerIndexTotal[a.id];
		const amountB = statistics.choiceAnswerIndexTotal[b.id];

		return amountA - amountB;
	});
</script>

<ul>
	{#each sortedByAscending as choice, index (choice.id)}
		{@const num = statistics.choiceAnswerIndexTotal[choice.id] ?? 0}

		<span class="row">
			<p class="num">({max - num})</p>

			<li class="item" style:width="{((max - num) / max) * 100}%">
				<p class="position">#{index + 1}</p>

				<ChoiceRenderer
					value={choice.data}
					type={choice.type}
					imageLabel={choice.id.substring(0, 4).toUpperCase()}
				/>
			</li>
		</span>
	{/each}
</ul>

<style>
	ul {
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.row {
		position: relative;
		display: flex;
		align-items: center;
	}

	.item {
		position: relative;
		padding: 8px;
		display: flex;
		align-items: center;
		background-color: rgb(50, 50, 50);
		gap: 8px;
		border-radius: 2px;
		min-height: 50px;
	}

	.position {
		opacity: 0.6;
		font-size: 12px;
	}

	.num {
		position: absolute;
		left: -4ch;

		opacity: 0;
		font-size: 12px;
	}

	.row:hover .num {
		opacity: 0.6;
	}
</style>
