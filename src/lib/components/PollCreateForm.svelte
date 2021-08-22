<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import type { Option } from '$lib/types/poll';
	import Plus from './Icons/plus.svelte';
	import Trash from './Icons/trash.svelte';

	const dispatch = createEventDispatcher();

	let title: string = '';
	let options: Option[] = [];
	let newOption: string = '';

	let shiftPressed = false;

	const handleNewOption = (e: any) => {
		if ((e.code !== 'Enter' && e.code !== 'Tab') || shiftPressed || newOption.trim() === '') return;
		e.preventDefault();

		options = [...options, { id: Date.now().toString(), text: newOption }];
		newOption = '';
	};

	const handleDeleteOption = (id: string) => {
		options = options.filter((o) => o.id !== id);
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();

		if (newOption.trim() !== '') {
			options = [...options, { id: Date.now().toString(), text: newOption }];
			newOption = '';
		}

		dispatch('submit', { title, options });
	};

	onMount(() => {
		document.addEventListener('keydown', (e) => {
			if (e.code === 'ShiftLeft') shiftPressed = true;
		});

		document.addEventListener('keyup', (e) => {
			if (e.code === 'ShiftLeft') shiftPressed = false;
		});
	});
</script>

<form>
	<input type="text" class="big" required bind:value={title} placeholder="Type your title here" />

	<h2>Options</h2>
	<ul>
		{#each options as { id, text } (id)}
			<li>
				<input type="text" class="text-input" bind:value={text} />
				<button class="delete" on:click={() => handleDeleteOption(id)}><Trash /></button>
			</li>
		{/each}

		<li class="new-option">
			<input
				type="text"
				bind:value={newOption}
				placeholder="Option text here"
				on:keydown={handleNewOption}
			/>
		</li>
	</ul>

	<button class="submit" on:click={handleSubmit}>Create poll<Plus /></button>
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

	.submit {
		font-size: 1.125rem;
		appearance: none;
		border: none;
		border-radius: 0.25rem;
		padding: 1rem 2rem;
		padding-right: 1.5rem;
		width: fit-content;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: #555;
	}

	.submit:hover {
		background: #ddd;
		border-color: #ddd;
		cursor: pointer;
	}

	input {
		font-size: 1.125rem;
		width: 100%;
		padding: 1em;
		box-sizing: border-box;
		border: 2px solid #eee;
		border-radius: 0.25rem;
		background: #eee;
	}

	input:focus {
		outline: none;
		border-color: #888;
		background: #fff;
	}

	ul {
		padding: 0;
	}

	li {
		list-style: none;
		margin-bottom: 0.5rem;
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

	.delete:hover {
		color: #555;
		cursor: pointer;
	}
</style>
