<script lang="ts">
	import Poll from '$lib/components/poll/Poll.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main>
	<Poll poll={data} />
</main>

<style>
	main {
		padding: 1rem;
		margin: 0 auto;
		max-width: 40rem;
		margin-top: 4rem;
		margin-bottom: 4rem;

		overflow: hidden;
	}
</style>
