<script lang="ts">
	import type { PollSection } from '$lib/schemas/poll';
	import { Button } from 'carbon-components-svelte';
	import { Checkmark } from 'carbon-icons-svelte';
	import { createEventDispatcher } from 'svelte';
	import Choice from '../choice/Choice.svelte';

	export let section: PollSection;

	const dispatch = createEventDispatcher();
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

<Button on:click={handleSubmit} disabled={selectedIds.length === 0} icon={Checkmark}>Submit</Button>
