<script lang="ts">
	import type { PollResponse, PollSection } from '$lib/schemas/poll';
	import { Checkbox, Form, SelectableTile } from 'carbon-components-svelte';
	import { createEventDispatcher } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let section: PollSection;
	export let store: Writable<PollResponse>;

	const dispatch = createEventDispatcher();

	const handleSelect = (id: string, value: boolean) => {
		const index = $store.data.indexOf(id);
		if (value && index === -1) {
			$store.data.push(id);
		} else if (!value && index !== -1) {
			$store.data.splice(index, 1);
		}

		$store.data = $store.data;
	};
</script>

<Form on:submit={() => dispatch('submit')}>
	<h2>{section.title}</h2>
	<p>{section.description}</p>

	<div role="group">
		{#each section.choices as choice (choice.id)}
			<Checkbox
				checked={$store.data.includes(choice.id)}
				value={choice.id}
				labelText={choice.value}
				on:check={(e) => handleSelect(choice.id, e.detail)}
			/>
		{/each}
	</div>
</Form>
