<script lang="ts">
	import PollForm from '$lib/components/answerForm/PollForm.svelte';
	import { pollFormStore } from '$lib/stores/form/pollForm';
	import type { PageData } from './$types';

	export let data: PageData;

	const store = pollFormStore(data);
</script>

<svelte:head>
	<title>{data.meta.title}</title>
</svelte:head>

<main>
	<PollForm poll={data} {store} />
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
