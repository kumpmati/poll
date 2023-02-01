<script lang="ts">
	import PollBuilder from '$lib/components/builder/PollBuilder.svelte';
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
</script>

<main>
	<h1>New poll</h1>

	<PollBuilder {builder} on:submit={(e) => console.log(e.detail)} />
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
