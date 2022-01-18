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

		// update poll when new data is received
		answers.subscribe((answer) => {
			if (answer && !poll.answers.some((a) => a.id === answer.id)) {
				poll.answers = [...poll.answers, answer];
			}
		});
	});
</script>

<svelte:head>
	<title>Results - {poll.title}</title>
</svelte:head>

<h1>{poll.title}</h1>

<div class="subtitle">
	<h2>Results</h2>
	<p>{stats.totalSubmissions} {stats.totalSubmissions === 1 ? 'answer' : 'answers'}</p>
</div>

<Results {poll} {stats} />

<div class="controls">
	<a href={`/${poll.id}`} class="button">Back</a>
</div>

<style>
	h1 {
		font-family: 'Urbanist';
		font-size: 4rem;
		margin-top: 8rem;
		word-wrap: break-word;
		hyphens: auto;
	}

	@media screen and (max-width: 700px) {
		h1 {
			font-size: 2.5rem !important;
		}
	}

	.subtitle {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		color: var(--text-subtle);
	}

	.subtitle h2 {
		font-family: 'Urbanist';
		margin-right: 1rem;
	}

	.subtitle p {
		color: var(--text-subtle);
	}

	h1 {
		font-size: 4rem;
		font-weight: 400;
	}

	p {
		margin: 0;
	}

	.controls {
		margin-top: 5rem;
	}

	.button {
		appearance: none;
		font-size: 1.35rem;
		font-family: inherit;
		border: none;
		border-radius: 0.25rem;
		padding: 0.75rem 1.5rem;
		color: #555;
		background: #eee;
		text-decoration: none;
		text-align: center;
	}

	.button:hover {
		cursor: pointer;
		color: #333;
		background: #ddd;
	}
</style>
