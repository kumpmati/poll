<script lang="ts">
	import type { Option } from '$lib/types/poll';
	import { createEventDispatcher } from 'svelte';
	import Plus from './Icons/plus.svelte';
	import Check from './Icons/check.svelte';
	import Trash from './Icons/trash.svelte';
	import More from './Icons/more-vertical.svelte';
	import { flip } from 'svelte/animate';
	import type { PartialPoll } from '$lib/utils/poll';
	import { nanoid } from 'nanoid';
	import { dndzone } from 'svelte-dnd-action';

	const dispatch = createEventDispatcher();

	let title: string = '';
	let options: Option[] = [
		{ id: nanoid(), text: '' },
		{ id: nanoid(), text: '' }
	];
	let multipleChoice: boolean;
	let maxChoices: number = 1;
	let allowMultipleAnswers: boolean = false;

	const handleNewOption = () => {
		options = [...options, { id: nanoid(), text: '' }];
	};

	const handleDeleteOption = (id: string) => {
		if (options.length <= 2) return;
		options = options.filter((o) => o.id !== id);
	};

	const handleConsider = (e: CustomEvent<DndEvent>) => {
		options = e.detail.items as Option[];
	};

	const handleFinalize = (e: CustomEvent<DndEvent>) => {
		options = e.detail.items as Option[];
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();

		if (title.trim() === '') return;

		const hasEmptyOptions = options.some((opt) => opt.text.trim() === '');
		if (hasEmptyOptions) return;

		const poll: PartialPoll = {
			title,
			options,
			allowMultipleAnswers,
			// use max choices when in multiple choice mode, otherwise use 1
			maxChoices: multipleChoice ? maxChoices : 1
		};
		dispatch('submit', poll);
	};
</script>

<form>
	<input
		type="text"
		class="text-input title"
		required
		bind:value={title}
		placeholder="Type your title here"
	/>

	<h2>Choices</h2>
	<ul
		use:dndzone={{ items: options, flipDurationMs: 200 }}
		on:consider={handleConsider}
		on:finalize={handleFinalize}
	>
		{#each options as { id, text }, index (id)}
			<li animate:flip={{ duration: 200 }} class="option" class:invalid={text.trim() === ''}>
				<div class="drag-handler"><More /></div>

				<input
					required
					type="text"
					class="text-input no-left-border"
					bind:value={text}
					placeholder={`Choice ${index + 1}`}
					on:keyup|preventDefault
				/>

				<button
					disabled={options.length <= 2}
					class="delete"
					type="button"
					on:click={() => handleDeleteOption(id)}
				>
					<Trash />
				</button>
			</li>
		{/each}
	</ul>

	<button class="button wide" on:submit|preventDefault on:click={handleNewOption}>
		<Plus />
	</button>

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

	ul {
		outline: none !important;
		margin: 0;
	}

	.title {
		padding: 1em !important;
		font-size: 1.35rem !important;
	}

	.title:invalid {
		border-color: var(--red);
	}

	.title:invalid:focus {
		border-color: var(--red);
		box-shadow: 0 0 0 5px var(--red-subtle);
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
		color: var(--text-inverted-subtle);
		background: #eee;
	}

	.button:hover {
		background: #ddd;
		border-color: #ddd;
		cursor: pointer;
	}

	.button.wide {
		width: 100%;
	}

	.submit {
		margin-top: 3rem;
		padding: 1rem 2.75rem 1rem 3rem;
		background: #5686b3;
		color: #fff;
	}

	.submit:hover {
		background: #4a6f92;
	}

	.text-input {
		font-size: 1.1rem;
		width: 100%;
		padding: 1rem;
		box-sizing: border-box;
		border-radius: 0.25rem;
		border: 2px solid #eee;
		background: #eee;

		transition: box-shadow 200ms;
	}

	.text-input:focus {
		outline: none;
		border-color: #888;
		background: #fff;
	}

	.option {
		position: relative;
		border: 2px solid transparent;
		border-radius: 0.35rem;
		overflow: hidden;

		transition: box-shadow 200ms;
	}

	.option.invalid {
		border-color: var(--red);
	}

	.option:focus-within {
		border-color: #888;
	}

	.option.invalid:focus-within {
		border-color: var(--red);
		box-shadow: 0 0 0 5px var(--red-subtle);
	}

	.option .text-input:focus {
		border-color: transparent;
	}

	.drag-handler {
		left: 0;
		height: 4rem;
		padding: 0 0.15rem;
		background: #ddd;
		color: #000;
		display: grid;
		place-content: center;
	}

	.text-input.no-left-border {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
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
