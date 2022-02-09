<script lang="ts">
	import type { Poll } from '$lib/types/poll';
	import type { Stats } from '$lib/utils/stats';
	import { crossfade } from 'svelte/transition';
	import { getSortedPollOptions } from '$lib/utils/sort';
	import { flip } from 'svelte/animate';

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
			class="details"
		>
			{#if text.startsWith('http')}
				<img class="image" src={text} alt="" />
			{:else}
				<p class="text">
					{text}
				</p>
			{/if}

			<div class="percentage">
				<p>
					<b class="number">{stats[id]}</b>
					<span class="subtle">({calcPercentage(id).toFixed(0)} %)</span>
				</p>

				<div class="bar" style={`width: ${calcPercentage(id)}%`} />
			</div>
		</li>
	{/each}
</ul>

<style>
	ul {
		list-style: none;
		color: var(--text);
		padding: 0;

		display: grid;
		grid-template-columns: 1fr;
	}

	li {
		margin-bottom: 2rem;
	}

	.details {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
	}

	.image {
		width: 100%;
		border-radius: 0.25rem;
		margin: 0.5rem 0;
	}

	.text {
		font-size: 1.125rem;
		margin: 0;
		margin-bottom: 0.5rem;
	}

	.percentage {
		position: relative;
		width: 100%;
		background: rgba(128, 128, 128, 0.1);
		border-radius: 0.25rem;
	}

	.percentage p {
		display: flex;
		align-items: center;
		position: absolute;
		top: 50%;
		left: 1rem;
		transform: translateY(-50%);
		margin: 0;
		color: #fff;
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
	}

	.percentage p .number {
		color: currentColor;
		font-size: 1.5rem;
		margin-right: 1ch;
	}

	.subtle {
		opacity: 0.75;
	}

	.bar {
		display: block;
		height: 2.5rem;
		border-radius: 0.25rem;
		background: var(--blue);
		transition: width 200ms, background-color 200ms;
	}
</style>
