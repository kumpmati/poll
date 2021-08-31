<script context="module">
	import { getPoll } from '$lib/utils/poll';

	export const load = async ({ page }) => {
		const { id } = page.params;

		const poll = await getPoll(id).catch(() => null);
		if (!poll) return;

		return {
			props: { poll }
		};
	};
</script>

<script lang="ts">
	import type { Poll } from '$lib/types/poll';
	import { calculateStats } from '$lib/utils/stats';
	import { onMount } from 'svelte';
	import { connectWebSocket } from '$lib/utils/websocket';
	import Results from '$lib/components/Results/Results.svelte';

	export let poll: Poll;

	// stats update when poll updates
	$: stats = calculateStats(poll);

	onMount(() => {
		const { answers, initial } = connectWebSocket(poll);

		initial.subscribe((value) => void (poll = value));

		answers.subscribe((answer) => {
			if (answer && !poll.answers.some((a) => a.id === answer.id)) {
				poll.answers = [...poll.answers, answer];
			}
		});
	});
</script>

<h1>{poll.title}</h1>

<div class="subtitle">
	<h2>Results</h2>
	<p>{stats.totalSubmissions} answers</p>
</div>

<Results {poll} {stats} />

<a href={`/${poll.id}`}>Submit again</a>

<style>
	h1 {
		font-family: 'Urbanist';
		margin-top: 8rem;
	}

	.subtitle {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		color: #333;
	}

	.subtitle h2 {
		font-family: 'Urbanist';
		margin-right: 1rem;
	}

	.subtitle p {
		color: #555;
	}

	h1 {
		font-size: 4rem;
		font-weight: 400;
	}

	p {
		margin: 0;
	}

	a {
		font-weight: 800;
		text-decoration: none;
		padding: 0.5rem 1rem;
		border-radius: 0.25rem;
		color: #555;
		background: #eee;
	}

	a:hover {
		cursor: pointer;
		color: #333;
		background: #ddd;
	}
</style>
