<script context="module">
	import { getPoll } from '$lib/utils/poll';

	export const load = async ({ page }) => {
		const { id } = page.params;

		const poll = await getPoll(id).catch(() => null);
		if (!poll) return;

		return {
			props: {
				id,
				poll
			}
		};
	};
</script>

<script lang="ts">
	import type { Poll } from '$lib/types/poll';
	import { calculateStats } from '$lib/utils/stats';
	import { onMount } from 'svelte';

	export let id: string;
	export let poll: Poll;

	const distribution = calculateStats(poll);
	const getPercentage = (id: string) => {
		let amount = (distribution[id] / distribution['total']) * 100;

		return isNaN(amount) ? 0 : amount;
	};

	onMount(() => {
		console.log('asdasd');
		const ws = new WebSocket(`ws://localhost:9001/poll/ws/${id}`);

		ws.addEventListener('open', () => console.log('connected'));
		ws.addEventListener('message', (d) => {
			const data = JSON.parse(d.data);
			console.log('new data');
			poll.answers.push(data);
			poll = poll;
		});
	});
</script>

<h1>{poll.title}</h1>

<div class="subtitle">
	<h2>Results</h2>
	<p>({distribution['total']} answers)</p>
</div>

<ul>
	{#each poll.options as opt (opt.id)}
		<li>
			<div class="details">
				<p class="text">
					{opt.text}
				</p>

				<p class="percentage">
					{getPercentage(opt.id).toFixed(0)}%
				</p>
			</div>

			<div class="bar" style={`width: ${getPercentage(opt.id)}%`} />
		</li>
	{/each}
</ul>

<a href={`/${id}`}>Submit again</a>

<style>
	h1 {
		font-family: 'Urbanist';
		margin-top: 8rem;
	}

	.subtitle {
		display: flex;
		align-items: baseline;
		color: #333;
	}

	.subtitle h2 {
		font-family: 'Urbanist';
		margin-right: 1rem;
	}

	.subtitle p {
		color: #888;
	}

	h1 {
		font-size: 4rem;
		font-weight: 400;
	}

	ul {
		list-style: none;
		color: #333;
		padding: 0;
	}

	p {
		margin: 0;
	}

	a {
		text-decoration: none;
		color: #555;
	}

	a:hover {
		color: #000;
	}

	li {
		margin-bottom: 2rem;
	}

	.details {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.text {
		font-size: 1.35rem;
		margin: 0;
		margin-bottom: 0.5rem;
	}

	.percentage {
		margin-left: 1rem;
		color: #555;
	}

	.bar {
		display: block;
		height: 1rem;
		border-radius: 0.25rem;
		background: #88f;
	}
</style>
