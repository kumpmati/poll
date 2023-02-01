<script lang="ts">
	import type { PollChoice, PollSection } from '$lib/schemas/poll';
	import { Button } from 'carbon-components-svelte';
	import { Checkmark } from 'carbon-icons-svelte';
	import { createEventDispatcher, getContext } from 'svelte';
	import Choice from '../choice/Choice.svelte';
	import { dndzone } from 'svelte-dnd-action';
	import { copy } from '$lib/util';
	import { flip } from 'svelte/animate';
	import { POLL_FORM_STORE, type PollFormStore } from '$lib/stores/form/pollForm';

	export let section: PollSection;

	const store = getContext<PollFormStore>(POLL_FORM_STORE);
	const dispatch = createEventDispatcher();
	let selected = copy(section.choices);

	const handleSubmit = () => {
		dispatch(
			'submit',
			selected.map((s) => s.id)
		);
	};

	let dirty = false;
</script>

<div
	use:dndzone={{ items: selected }}
	on:consider={(e) => (selected = e.detail.items)}
	on:finalize={(e) => {
		selected = e.detail.items;
		dirty = true;
	}}
>
	{#each selected as choice, index (choice.id)}
		<span animate:flip={{ duration: 200 }}>
			<p>{index + 1}</p>

			<Choice {choice} selected={false} />
		</span>
	{/each}
</div>

<Button on:click={handleSubmit} disabled={!dirty || $store.loading} icon={Checkmark}>Submit</Button>

<style>
	span {
		display: flex;
		width: 100%;
	}
</style>
