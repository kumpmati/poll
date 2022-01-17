<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Option } from '$lib/types/poll';
	import Plus from './Icons/plus.svelte';
	import Trash from './Icons/trash.svelte';
	import { flip } from 'svelte/animate';

	const dispatch = createEventDispatcher();

	let title: string = '';
	let options: Option[] = [{ id: Date.now().toString(), text: null }];

	const handleNewOption = () => {
		options = [...options, { id: Date.now().toString(), text: '' }];
	};

	const handleDeleteOption = (id: string) => {
		options = options.filter((o) => o.id !== id);
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();

		if (title.trim() === '') return;

		const optionsHaveContent = options.every((opt) => opt.text.trim() !== '');

		if (!optionsHaveContent) return;

		dispatch('submit', { title, options });
	};
</script>

<form>
	<input type="text" class="big" required bind:value={title} placeholder="Type your title here" />

	<h2>Options</h2>
	<ul>
		{#each options as { id, text }, index (id)}
			<li>
				<input
					required
					type="text"
					class="text-input"
					bind:value={text}
					placeholder={`Option ${index + 1}`}
					on:keyup|preventDefault
				/>

				<button class="delete" type="button" on:click={() => handleDeleteOption(id)}>
					<Trash />
				</button>
			</li>
		{/each}

		<button class="button wide" on:submit|preventDefault on:click={handleNewOption}>
			Add option<Plus />
		</button>
	</ul>

	<button type="submit" class="button submit" on:click={handleSubmit}>Create poll</button>
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
