<script lang="ts">
	import type { PollResponse, Poll } from '$lib/schemas/poll';
	import { Button } from 'carbon-components-svelte';
	import { ArrowRight } from 'carbon-icons-svelte';
	import { writable } from 'svelte/store';
	import PollMultipleChoiceSection from './PollMultipleChoiceSection.svelte';
	import PollSingleChoiceSection from './PollSingleChoiceSection.svelte';

	export let poll: Poll;

	let currentSection = 0;

	const store = writable<PollResponse>({
		id: poll.id,
		sectionId: poll.sections[currentSection].id,
		timestamp: Date.now(),
		data: []
	});

	$: section = poll.sections[currentSection];

	const handleNextSection = () => {
		currentSection++;
		$store.data = [];
	};
</script>

<h2>{poll.title}</h2>
<p>{poll.description}</p>

{#if section.mode === 'singlechoice'}
	<PollSingleChoiceSection {section} {store} />
{:else if section.mode === 'multiplechoice'}
	<PollMultipleChoiceSection {section} {store} />
{/if}

<Button on:click={handleNextSection} icon={ArrowRight}>Next</Button>
