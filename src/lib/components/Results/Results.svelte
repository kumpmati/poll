<script lang="ts">
	import type { Poll } from '$lib/types/poll';
	import type { Stats } from '$lib/utils/stats';
	import { crossfade } from 'svelte/transition';
	import { getSortedPollOptions } from '$lib/utils/sort';
	import { flip } from 'svelte/animate';
	import { identity } from 'svelte/internal';

	export let poll: Poll;
	export let stats: Stats;

	const calcPercentage = (id: string) => {
		let amount = (stats[id] / stats.totalSubmissionOptions) * 100;

		return isNaN(amount) ? 0 : amount;
	};

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200)
	});
</script>

<ul>
	{#each getSortedPollOptions(poll, stats) as { id, text } (id)}
		<li
			in:receive|local={{ key: id }}
			out:send|local={{ key: id }}
			animate:flip={{ duration: 200 }}
		>
			<div class="details">
				{#if text.startsWith('http')}
					<img class="image" src={text} alt="" />
				{:else}
					<p class="text">
						{text}
					</p>
				{/if}

				<p class="percentage">
					{calcPercentage(id).toFixed(0)} <span>%</span>
				</p>
			</div>

			<div class="bar" style={`width: ${calcPercentage(id)}%`} />
		</li>
	{/each}
</ul>

<style>
	ul {
		list-style: none;
		color: var(--text);
		padding: 0;
	}

	li {
		margin-bottom: 2rem;
	}

	.details {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.image {
		width: 80%;
		max-width: 25rem;
		border-radius: 0.25rem;
		margin: 0.5rem 0;
	}

	.text {
		font-size: 1.125rem;
		margin: 0;
		margin-bottom: 0.5rem;
	}

	.percentage {
		margin-left: 1rem;
		color: var(--text);
	}

	.percentage > span {
		color: var(--text-subtle);
	}

	/* Color first bar differently */
	ul > li:first-of-type .bar {
		background: rgb(55, 85, 114) !important;
	}

	.bar {
		display: block;
		height: 2.5rem;
		border-radius: 0.25rem;
		background-color: rgb(104, 160, 212);
		transition: width 200ms, background-color 200ms;
	}
</style>
