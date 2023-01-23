<script lang="ts">
	import { goto } from '$app/navigation';
	import { createPoll, createPollResults } from '$lib/gun';
	import { user } from '$lib/stores/user';
	import { onMount } from 'svelte';
	import { nanoid } from 'nanoid';
	import { writable } from 'svelte/store';

	onMount(() => {
		if (!$user) goto('/auth');
	});

	const form = writable({
		title: '',
		description: ''
	});

	const handleSubmit = async () => {
		const result = await createPoll({
			id: nanoid(6),
			publishedAt: Date.now(),
			title: $form.title,
			description: $form.description,
			author: $user?.alias ?? 'public',
			sections: {}
		});

		console.log(result);

		await createPollResults(result.id);

		await goto(`/poll/${result.id}`);
	};
</script>

<a href="/">Home</a>

<form on:submit|preventDefault={handleSubmit}>
	<input type="text" bind:value={$form.title} placeholder="Title" />
	<input type="text" bind:value={$form.description} placeholder="Description" />

	<input type="submit" />
</form>
