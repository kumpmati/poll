<script lang="ts">
	import type { PollResponse, PollSection } from '$lib/schemas/poll';
	import { Form, RadioButton, RadioButtonGroup, SelectableTile } from 'carbon-components-svelte';
	import { createEventDispatcher } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let section: PollSection;
	export let store: Writable<PollResponse>;

	const dispatch = createEventDispatcher();
</script>

<Form on:submit={() => dispatch('submit')}>
	<h2>{section.title}</h2>
	<p>{section.description}</p>

	<RadioButtonGroup bind:selected={$store.data[0]}>
		{#each section.choices as choice (choice.id)}
			<RadioButton labelText={choice.value} value={choice.id} />
		{/each}
	</RadioButtonGroup>
</Form>
