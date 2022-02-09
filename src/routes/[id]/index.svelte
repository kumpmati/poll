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
	import Button from '$lib/components/Button/Button.svelte';
	import Markdown from '$lib/components/Markdown/Markdown.svelte';

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
	<Markdown value={poll.description} />
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
		<Button priority="main" {loading} disabled={!canSubmit}>
			{canSubmit ? 'Submit' : 'Submitted'}
		</Button>

		<Button priority="secondary" link={`./${id}/results`}>Results</Button>
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

	.controls {
		margin-top: 3rem;
		display: flex;
		gap: 1rem;
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
