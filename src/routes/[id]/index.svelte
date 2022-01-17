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

	export let id: string;
	export let poll: Poll;

	let selections: string[] = [];
	let canSubmit: boolean = false;

	$: {
		if (browser) {
			const hasSubmitted = localStorage.getItem(`poll-${id}`);
			canSubmit = poll.allowMultipleAnswers || !hasSubmitted;
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!canSubmit) return;

		const response = await submitAnswer(id, selections);
		if (response.id) {
			// save time when poll was submitted into local storage
			localStorage.setItem(`poll-${id}`, new Date().toString());
			// navigate to results page
			await goto(`${response.id}/results`);
		}
	};
</script>

<h1>{poll.title}</h1>

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
		<input
			type="submit"
			class="button big"
			value="Submit"
			disabled={!canSubmit}
			title={!canSubmit ? 'Already submitted' : ''}
		/>
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

	@media screen and (max-width: 700px) {
		h1 {
			font-size: 2.5rem;
		}
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
		color: #555;
		background: #eee;
		text-decoration: none;
		text-align: center;
	}

	.button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.button:not(:disabled):hover {
		cursor: pointer;
		color: #333;
		background: #ddd;
	}

	.big {
		padding: 0.75rem 4rem;
	}
</style>
