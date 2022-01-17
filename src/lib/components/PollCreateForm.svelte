<script lang="ts">
	import type { Option } from '$lib/types/poll';
	import { createEventDispatcher } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import Plus from './Icons/plus.svelte';
	import Check from './Icons/check.svelte';
	import Trash from './Icons/trash.svelte';
	import { flip } from 'svelte/animate';
	import { crossfade } from 'svelte/transition';
	import type { PartialPoll } from '$lib/utils/poll';

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 200,
				easing: quintOut,
				css: (t) => `
					height: ${t * 61}px;
					transform: ${transform};
					opacity: ${t};
				`
			};
		}
	});

	const dispatch = createEventDispatcher();

	let title: string = '';
	let options: Option[] = [{ id: Date.now().toString(), text: '' }];
	let multipleChoice: boolean;
	let maxChoices: number = 1;
	let allowMultipleAnswers: boolean = false;

	const handleNewOption = () => {
		options = [...options, { id: Date.now().toString(), text: '' }];
	};

	const handleDeleteOption = (id: string) => {
		if (options.length === 1) return;
		options = options.filter((o) => o.id !== id);
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();

		if (title.trim() === '') return;

		const optionsHaveContent = options.every((opt) => opt.text.trim() !== '');
		if (!optionsHaveContent) return;

		const poll: PartialPoll = {
			title,
			options,
			allowMultipleAnswers,
			maxChoices: multipleChoice ? maxChoices : 1
		};
		dispatch('submit', poll);
	};
</script>

<form>
	<input type="text" class="big" required bind:value={title} placeholder="Type your title here" />

	<h2>Choices</h2>
	<ul>
		{#each options as { id, text }, index (id)}
			<li
				animate:flip={{ duration: 200 }}
				out:send|local={{ key: id }}
				in:receive|local={{ key: id }}
			>
				<input
					required
					type="text"
					class="text-input"
					bind:value={text}
					placeholder={`Choice ${index + 1}`}
					on:keyup|preventDefault
				/>

				<button
					disabled={options.length === 1}
					class="delete"
					type="button"
					on:click={() => handleDeleteOption(id)}
				>
					<Trash />
				</button>
			</li>
		{/each}

		<button class="button wide" on:submit|preventDefault on:click={handleNewOption}>
			Add choice<Plus />
		</button>
	</ul>

	<h2>Options</h2>
	<div class="options">
		<div class="maxChoices">
			<label>
				<input type="checkbox" bind:checked={multipleChoice} />
				Multiple choice
			</label>

			{#if multipleChoice}
				<label>
					<input type="number" min={1} max={100} bind:value={maxChoices} />
					Max number of choices
				</label>
			{/if}
		</div>
		<div class="multipleSubmissions">
			<label>
				<input type="checkbox" bind:checked={allowMultipleAnswers} />
				Allow multiple submissions
			</label>
		</div>
	</div>

	<button type="submit" class="button submit" on:click={handleSubmit}>
		Create poll <Check />
	</button>
</form>

<style>
	form {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	h2 {
		margin-top: 4rem;
		font-weight: 800;
	}

	.big {
		font-size: 1.35rem;
	}

	.button {
		font-size: 1.125rem;
		appearance: none;
		border: none;
		border-radius: 0.25rem;
		padding: 1rem 2rem;
		width: fit-content;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		color: #555;
	}

	.button:hover {
		background: #ddd;
		border-color: #ddd;
		cursor: pointer;
	}

	.button.wide {
		width: 100%;
	}

	.button.submit {
		margin-top: 3rem;
		padding: 1rem 2.75rem 1rem 3rem;
		background: #5686b3;
		color: #fff;
	}

	.button.submit:hover {
		background: #4a6f92;
	}

	input[type='text'] {
		font-size: 1.125rem;
		width: 100%;
		padding: 1em;
		box-sizing: border-box;
		border: 2px solid #eee;
		border-radius: 0.25rem;
		background: #eee;

		transition: box-shadow 100ms;
	}

	input[type='text']:focus {
		outline: none;
		border-color: #888;
		background: #fff;
	}

	input[type='text']:invalid {
		border-color: rgb(255, 88, 88);
		box-shadow: 0 0 0 5px rgb(255, 194, 194);
	}

	ul {
		padding: 0;
	}

	li {
		list-style: none;
		margin-bottom: 1rem;
		display: flex;
		position: relative;
	}

	.text-input {
		padding-right: 4rem;
	}

	.delete {
		width: 3.5rem;
		height: calc(100% - 0.5rem);
		font-size: 1.5rem;
		display: grid;
		place-content: center;
		border: none;
		background: rgba(238, 238, 238, 0.5);
		backdrop-filter: blur(5px);
		border-radius: 0.125rem;
		margin: 0.25rem;
		color: #888;
		position: absolute;
		right: 0;
		top: 0;
	}

	.delete:disabled {
		visibility: hidden;
	}

	.delete:not(:disabled):hover {
		color: #555;
		cursor: pointer;
	}

	.options {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	@media screen and (max-width: 800px) {
		.options {
			grid-template-columns: 1fr;
		}
	}

	.maxChoices {
		display: flex;
		flex-direction: column;
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

	label > input[type='checkbox'] {
		margin-right: 1rem;
		width: 1.5rem;
		min-width: 1.5rem;
		height: 1.5rem;
		margin-right: 0.5rem;
	}

	label > input[type='number'] {
		margin-right: 1rem;
		font-size: 1.25rem;
		width: 4ch;
	}
</style>
