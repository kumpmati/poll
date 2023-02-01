<script lang="ts">
	import type { PollSection } from '$lib/schemas/poll';
	import { Button } from 'carbon-components-svelte';
	import { Checkmark, Send } from 'carbon-icons-svelte';
	import { createEventDispatcher } from 'svelte';
	import Choice from '../choice/Choice.svelte';

	export let section: PollSection;

	const dispatch = createEventDispatcher();
	let selected: string[] = [];

	const handleSelect = (id: string) => {
		if (selected.includes(id)) {
			selected = selected.filter((s) => s !== id);
		} else {
			selected = [...selected, id];
		}
	};

	const handleSubmit = () => {
		dispatch('submit', selected);
	};
</script>

{#each section.choices as choice (choice.id)}
	<Choice
		{choice}
		selected={selected.includes(choice.id)}
		on:click={() => handleSelect(choice.id)}
	/>
{/each}

<Button on:click={handleSubmit} disabled={selected.length === 0} icon={Checkmark}>Submit</Button>
