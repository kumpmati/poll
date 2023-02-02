<script lang="ts">
	import { goto } from '$app/navigation';
	import PollBuilder from '$lib/components/builder/PollBuilder.svelte';
	import { pollSchema } from '$lib/schemas/poll';
	import { pollBuilder } from '$lib/stores/builder/poll';
	import { nanoid } from 'nanoid';

	const builder = pollBuilder({
		id: nanoid(),
		type: 'all_sections_normal',
		meta: {
			title: '',
			description: '',
			author: null,
			createdAt: new Date().toISOString()
		}
	});

	const handleSubmit = async (e: CustomEvent) => {
		const result = await pollSchema.safeParseAsync(e.detail);
		if (!result.success) {
			alert('Invalid poll');
			return;
		}

		const response = await fetch('/new', {
			method: 'POST',
			body: JSON.stringify(result.data)
		})
			.then((d) => d.json())
			.catch((err) => {
				console.log(err);
				return null;
			});

		if (!response?.id) {
			return alert('Failed to create poll.');
		}

		goto(`/poll/${response.id}`);
	};
</script>

<svelte:head>
	<title>Create poll</title>
</svelte:head>

<main>
	<h1>Create poll</h1>

	<PollBuilder {builder} on:submit={handleSubmit} />
</main>

<style>
	h1 {
		margin-bottom: 2rem;
	}

	main {
		padding: 1rem;
		margin: 0 auto;
		max-width: 40rem;
		margin-top: 4rem;
		margin-bottom: 4rem;

		overflow: hidden;
	}
</style>
