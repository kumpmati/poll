<script lang="ts">
	import { goto } from '$app/navigation';
	import PollForm from '$lib/components/answerForm/PollForm.svelte';
	import { pollFormStore } from '$lib/stores/form/pollForm';
	import type { PageData } from './$types';

	export let data: PageData;

	const store = pollFormStore(data);

	const handleSubmit = async (e: CustomEvent) => {
		const success = await store.submitPoll();
		if (!success) {
			return alert('Something went wrong');
		}

		await goto(`/poll/${data.id}/responses`);
	};
</script>

<svelte:head>
	<title>{data.meta.title}</title>
</svelte:head>

<PollForm poll={data} {store} on:submit={handleSubmit} />
