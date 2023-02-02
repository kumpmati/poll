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

<PollForm poll={data} {store} />
