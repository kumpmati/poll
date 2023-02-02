<script lang="ts">
	import type { Poll, PollResponseItem } from '$lib/schemas/poll';
	import { POLL_FORM_STORE, type PollFormStore } from '$lib/stores/form/pollForm';
	import { Button, ProgressBar } from 'carbon-components-svelte';
	import { Result } from 'carbon-icons-svelte';
	import { createEventDispatcher, setContext } from 'svelte';
	import SectionForm from './SectionForm.svelte';

	export let poll: Poll;
	export let store: PollFormStore;
	const dispatch = createEventDispatcher();

	setContext(POLL_FORM_STORE, store);

	$: section = poll.sections[$store.currentSection];
	$: progress = $store.currentSection / poll.sections.length;
	let completed = false;

	const handleSubmit = async (e: CustomEvent<PollResponseItem[]>) => {
		const isLast = $store.currentSection >= poll.sections.length - 1;

		store.answerSection(section.id, e.detail);

		if (isLast) {
			dispatch('submit');
			completed = true;
		}
	};
</script>

<h1>{poll.meta.title}</h1>
<p>{poll.meta.description}</p>

{#if poll.sections.length > 1}
	<br />
	<ProgressBar
		helperText="Section {$store.currentSection + 1}/{poll.sections.length}"
		value={completed ? 100 : progress * 100}
	/>
	<br />
	<br />
{/if}

<SectionForm {section} showMeta={poll.sections.length > 1} on:submit={handleSubmit} />

<Button kind="ghost" href="/poll/{poll.id}/responses" icon={Result}>View responses</Button>

<style>
	p {
		opacity: 0.6;
	}
</style>
