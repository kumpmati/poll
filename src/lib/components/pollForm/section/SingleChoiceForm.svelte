<script lang="ts">
	import type { PollSection } from '$lib/schemas/poll';
	import { POLL_FORM_STORE, type PollFormStore } from '$lib/stores/form/pollForm';
	import { Button } from 'carbon-components-svelte';
	import { Checkmark } from 'carbon-icons-svelte';
	import { createEventDispatcher, getContext } from 'svelte';
	import Choice from '../choice/Choice.svelte';

	export let section: PollSection;

	const store = getContext<PollFormStore>(POLL_FORM_STORE);
	const dispatch = createEventDispatcher();
	let selected: string | null = null;

	const handleSelect = (id: string) => {
		selected = id === selected ? null : id;
	};

	const handleSubmit = () => {
		dispatch('submit', [selected]);
	};
</script>

{#each section.choices as choice (choice.id)}
	<Choice {choice} selected={selected === choice.id} on:click={() => handleSelect(choice.id)} />
{/each}

<Button on:click={handleSubmit} disabled={!selected || $store.loading} icon={Checkmark}>
	Submit
</Button>
