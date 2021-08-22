<script>
	import { goto } from '$app/navigation';
	import PollCreateForm from '$lib/components/PollCreateForm.svelte';
	import { createPoll } from '$lib/utils/poll';

	const handleNewTodo = async ({ detail }) => {
		const poll = await createPoll(detail);

		if (poll?.id) await goto(`/${poll.id}`);
	};
</script>

<h1>POLL</h1>

<PollCreateForm on:submit={handleNewTodo} />

<style>
	h1 {
		font-size: 5rem;
		font-weight: 400;
	}
</style>
