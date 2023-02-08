<script lang="ts">
	import type { PollSection } from '$lib/schemas/poll';
	import type { PollStatistics } from '$lib/utils/statistics';
	import ChoiceRenderer from '../ChoiceRenderer.svelte';

	export let section: PollSection;

	export let statistics: PollStatistics;

	const biggestValue = Math.max(...Object.values(statistics.choiceAnswerIndexTotal)) ?? 1;

	const sortedByDescending = section.choices.sort((a, b) => {
		const amountA = statistics.choiceAnswerIndexTotal[a.id];
		const amountB = statistics.choiceAnswerIndexTotal[b.id];

		return amountB - amountA;
	});
</script>

<ul>
	{#each sortedByDescending as choice, index (choice.id)}
		{@const num = statistics.choiceAnswerIndexTotal[choice.id] ?? 0}

		<span class="row">
			<p class="num-wrapper">
				<span class="num">
					({num})
				</span>
				<span class="position">
					#{index + 1}
				</span>
			</p>

			<li class="item">
				<div class="bar" style:width="{(num / biggestValue) * 100}%" />

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

	@media screen and (max-width: 700px) {
		ul {
			padding-left: 16px;
		}
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
		gap: 8px;
		width: 100%;
	}

	.bar {
		left: 0;
		position: absolute;
		background-color: rgb(50, 50, 50);
		padding: 8px;
		border-radius: 3px;
		height: 100%;
		z-index: -1;
	}

	.num-wrapper {
		opacity: 0.6;
		font-size: 12px;
		margin-right: 8px;
	}

	.num,
	.position {
		width: 3ch;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: -3ch;
		text-align: right;
	}

	.row:hover .num {
		display: block;
	}
	.row:not(:hover) .num {
		display: none;
	}

	.row:hover .position {
		display: none;
	}
	.row:not(:hover) .position {
		display: block;
	}
</style>
