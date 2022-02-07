<script context="module">
	import { getPoll, getPollResults } from '$lib/utils/poll';

	export const load = async ({ page }) => {
		const { id } = page.params;

		const poll = await getPoll(id).catch(() => null);
		if (!poll) return;

		const results = await getPollResults(id).catch(() => null);
		if (!results) return;

		return {
			props: {
				poll,
				results
			}
		};
	};
</script>

<script lang="ts">
	import type { Poll, Results as ResultsType } from '$lib/types/poll';
	import { calculateStats } from '$lib/utils/stats';
	import Results from '$lib/components/Results/Results.svelte';
	import { onMount } from 'svelte';
	import { connectSocketIO } from '$lib/utils/websocket';

	export let poll: Poll;
	export let results: ResultsType;

	// stats update when poll or results update
	$: stats = calculateStats(poll, results);

	onMount(() => {
		connectSocketIO(results, poll.id).subscribe((value) => (results = value));
	});
</script>

<svelte:head>
	<title>Results - {poll.title}</title>
</svelte:head>

<h1>{poll.title}</h1>

<div class="subtitle">
	<h2>Results</h2>
	<div class="numbers">
		<p>
			<b>{stats.totalSubmissions}</b>
			<span class="subtle">{stats.totalSubmissions === 1 ? 'submission' : 'submissions'}</span>
		</p>
		{#if poll.maxChoices > 1}
			<span class="subtle">({stats.totalSubmissionOptions} total options selected)</span>
		{/if}
	</div>
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
		color: var(--text);
	}

	.subtle {
		color: var(--text-subtle);
	}

	.numbers {
		text-align: right;
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
		margin-top: 1rem;
		font-size: 1.35rem;
		font-family: inherit;
		border: none;
		border-radius: 0.25rem;
		padding: 0.75rem 1.5rem;
		color: currentColor;
		background: rgba(128, 128, 128, 0.25);
		text-decoration: none;
		text-align: center;
	}

	.button:disabled {
		opacity: 0.75;
		cursor: not-allowed;
	}

	.button:not(:disabled):hover {
		cursor: pointer;
		color: currentColor;
		background: rgba(128, 128, 128, 0.4);
	}
</style>
