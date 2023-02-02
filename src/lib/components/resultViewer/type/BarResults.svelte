<script lang="ts">
	import type { PollSection } from '$lib/schemas/poll';
	import type { PollStatistics } from '$lib/utils/statistics';
	import ChoiceRenderer from '../ChoiceRenderer.svelte';

	export let section: PollSection;
	export let statistics: PollStatistics;

	let maxNumAnswers = Math.max(...Object.values(statistics.answersPerChoice));

	let sortedByAmount = section.choices.sort((a, b) => {
		const amountA = statistics.answersPerChoice[a.id] ?? 0;
		const amountB = statistics.answersPerChoice[b.id] ?? 0;

		return amountB - amountA;
	});
</script>

<ul>
	{#each sortedByAmount as choice, index (choice.id)}
		{@const num = statistics.answersPerChoice[choice.id] ?? 0}
		{@const width = num / maxNumAnswers}

		<span class="row">
			<p class="num">({num})</p>

			<li class="item" style:width="{width * 100}%">
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
