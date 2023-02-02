<script lang="ts">
	import type { PollResponseItem, PollSection } from '$lib/schemas/poll';
	import { POLL_FORM_STORE, type PollFormStore } from '$lib/stores/form/pollForm';
	import { Button } from 'carbon-components-svelte';
	import { Checkmark } from 'carbon-icons-svelte';
	import { createEventDispatcher, getContext } from 'svelte';
	import Choice from '../choice/Choice.svelte';

	export let section: PollSection;

	const store = getContext<PollFormStore>(POLL_FORM_STORE);
	const dispatch = createEventDispatcher<{ submit: PollResponseItem[] }>();

	let selectedId: string | null;
	let choices = section.choices.map((c) => ({ ...c, userData: null }));

	const handleSelect = (id: string) => {
		selectedId = id !== selectedId ? id : null;
	};

	const handleSubmit = () => {
		const selectedChoice = choices.find((c) => c.id === selectedId);

		if (selectedId && selectedChoice) dispatch('submit', [selectedChoice]);
	};
</script>

{#each choices as choice (choice.id)}
	<Choice
		{choice}
		bind:userData={choice.userData}
		selected={selectedId === choice.id}
		on:select={() => handleSelect(choice.id)}
	/>
{/each}

<Button on:click={handleSubmit} disabled={!selectedId || $store.loading} icon={Checkmark}>
	Submit
</Button>
