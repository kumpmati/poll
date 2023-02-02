<script lang="ts">
	import type { PollSection } from '$lib/schemas/poll';
	import { POLL_FORM_STORE, type PollFormStore } from '$lib/stores/form/pollForm';
	import { Button } from 'carbon-components-svelte';
	import { Checkmark } from 'carbon-icons-svelte';
	import { createEventDispatcher, getContext } from 'svelte';
	import Choice from '../choice/Choice.svelte';

	export let section: PollSection;

	const dispatch = createEventDispatcher();
	const store = getContext<PollFormStore>(POLL_FORM_STORE);

	let selectedIds: string[] = [];
	let choices = section.choices.map((c) => ({ ...c, userData: null }));

	const handleSelect = (id: string) => {
		if (selectedIds.includes(id)) {
			selectedIds = selectedIds.filter((s) => s !== id);
		} else {
			selectedIds = [...selectedIds, id];
		}
	};

	const handleSubmit = () => {
		dispatch(
			'submit',
			choices.filter((c) => selectedIds.includes(c.id))
		);
	};
</script>

{#each choices as choice (choice.id)}
	<Choice
		{choice}
		bind:userData={choice.userData}
		selected={selectedIds.includes(choice.id)}
		on:select={() => handleSelect(choice.id)}
	/>
{/each}

<Button
	on:click={handleSubmit}
	disabled={selectedIds.length === 0 || $store.loading}
	icon={Checkmark}
>
	Confirm
</Button>
