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

	export let id: string;
	export let poll: Poll;
	let selections: string[] = [];

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await submitAnswer(id, selections);
		if (response.id) goto(`${response.id}/results`);
	};
</script>

<h1>{poll.title}</h1>

<form on:submit={handleSubmit}>
	<ul>
		{#each poll.options as option (option.id)}
			<li>
				<label>
					<input type="checkbox" bind:group={selections} value={option.id} />
					{option.text}
				</label>
			</li>
		{/each}
	</ul>

	<div class="controls">
		<input type="submit" class="button big" value="Submit" />
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

	ul {
		padding: 0;
		list-style: none;
	}

	li {
		margin-bottom: 0.5rem;
	}

	label {
		display: flex;
		align-items: center;
		font-size: 1.35rem;
		padding: 0.5rem;
		padding-left: 0;
		width: 100%;
		border-radius: 0.25rem;
	}

	label > input {
		width: 1.5rem;
		min-width: 1.5rem;
		height: 1.5rem;
		margin-right: 0.5rem;
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

	.button:hover {
		cursor: pointer;
		color: #333;
		background: #ddd;
	}

	.big {
		padding: 0.75rem 4rem;
	}
</style>
