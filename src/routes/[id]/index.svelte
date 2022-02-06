<script context="module">
	import { getPoll, submitAnswer } from '$lib/utils/poll';

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
	import { goto } from '$app/navigation';
	import RadioGroup from '$lib/components/form/RadioGroup.svelte';
	import CheckboxGroup from '$lib/components/form/CheckboxGroup.svelte';
	import { browser } from '$app/env';
	import { nanoid } from 'nanoid';
	import Refresh from '$lib/components/Icons/refresh.svelte';
	import SvelteMarkdown from 'svelte-markdown';

	export let id: string;
	export let poll: Poll;

	let selections: string[] = [];
	let canSubmit: boolean = false;
	let loading: boolean = false;

	$: {
		if (browser) {
			const hasSubmitted = localStorage.getItem(`poll-${id}`);
			canSubmit = poll.allowMultipleAnswers || !hasSubmitted;
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!canSubmit) return;

		// either get existing answer id for this poll or generate new one
		const userId = localStorage.getItem(`poll-${id}`) || nanoid();

		loading = true;
		const response = await submitAnswer(id, selections, userId);
		loading = false;
		if (response) {
			// save the answer id to local storage for future use in this poll
			localStorage.setItem(`poll-${id}`, userId);

			// navigate to results page
			await goto(`${id}/results`);
		}
	};
</script>

<svelte:head>
	<title>{poll.title}</title>
</svelte:head>

<h1>{poll.title}</h1>

<span class="description">
	<SvelteMarkdown source={poll.description} />
</span>

<div class="settings">
	<p>
		{poll.allowMultipleAnswers ? 'Multiple submissions allowed' : 'One submission per person'}
	</p>
	<p>
		{poll.maxChoices > 1 ? `Multiple choice (max ${poll.maxChoices} choices)` : 'Single choice'}
	</p>
</div>

<form on:submit={handleSubmit}>
	{#if poll.maxChoices === 1}
		<RadioGroup options={poll.options} bind:selection={selections} />
	{:else}
		<CheckboxGroup
			maxChoices={poll.maxChoices}
			options={poll.options}
			bind:selection={selections}
		/>
	{/if}

	<div class="controls">
		<button
			type="submit"
			class="button big"
			value="Submit"
			disabled={!canSubmit || loading}
			title={!canSubmit ? 'Cannot submit more than once' : ''}
		>
			{#if loading}
				<span class="spinner">
					<Refresh />
				</span>
			{:else}
				{canSubmit ? 'Submit' : 'Submitted'}
			{/if}</button
		>
		<a class="button" href={`${id}/results`}>Results</a>
	</div>
</form>

<style>
	h1 {
		font-family: 'Urbanist';
		margin-top: 8rem;
		font-size: 4rem;
		font-weight: 400;
	}

	.settings {
		color: var(--text-subtle);
		margin: 3rem 0;
		background: rgba(0, 0, 0, 0.1);
		padding: 0.25rem 1rem;
		border-radius: 0.25rem;
		width: fit-content;
	}

	@media screen and (max-width: 700px) {
		h1 {
			font-size: 3.25rem;
		}

		.controls {
			flex-direction: column;
		}
	}

	.description {
		color: var(--text-subtle);
	}

	.description > :global(h1),
	.description > :global(h2),
	.description > :global(h3),
	.description > :global(h4) {
		color: var(--text);
		font-family: 'Open Sans' !important;
		font-weight: 400;
	}

	.controls {
		margin-top: 3rem;
		display: flex;
		gap: 1rem;
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

	.big {
		background: var(--blue);
		color: #eee;
		padding: 0.75rem 4rem;
	}

	.button.big:not(:disabled):hover {
		background: var(--blue-subtle);
		color: #ddd;
	}

	.spinner {
		display: grid;
		place-content: center;
		animation: spin 1s both infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
