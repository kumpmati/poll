<script lang="ts">
	import type { Poll } from '$lib/schemas/poll';
	import { POLL_FORM_STORE, type PollFormStore } from '$lib/stores/form/pollForm';
	import { setContext } from 'svelte';
	import SectionForm from './SectionForm.svelte';

	export let poll: Poll;
	export let store: PollFormStore;

	setContext(POLL_FORM_STORE, store);

	$: section = poll.sections[$store.currentSection];

	const handleSubmit = async (e: CustomEvent) => {
		const isLast = $store.currentSection >= poll.sections.length - 1;

		store.answerSection(section.id, e.detail);

		if (isLast) {
			const success = await store.submitPollAnswer();
			console.log({ success });
		}
	};
</script>

<h1>{poll.meta.title}</h1>
<p>{poll.meta.description}</p>

<br />

<SectionForm {section} showMeta={poll.sections.length > 1} on:submit={handleSubmit} />
