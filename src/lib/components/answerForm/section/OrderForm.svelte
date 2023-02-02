<script lang="ts">
	import type { PollResponseItem, PollSection } from '$lib/schemas/poll';
	import { Button } from 'carbon-components-svelte';
	import { Checkmark } from 'carbon-icons-svelte';
	import { createEventDispatcher, getContext } from 'svelte';
	import Choice from '../choice/Choice.svelte';
	import { dndzone } from 'svelte-dnd-action';
	import { copy } from '$lib/utils';
	import { flip } from 'svelte/animate';
	import { POLL_FORM_STORE, type PollFormStore } from '$lib/stores/form/pollForm';

	export let section: PollSection;

	const store = getContext<PollFormStore>(POLL_FORM_STORE);
	const dispatch = createEventDispatcher<{ submit: PollResponseItem[] }>();

	let dirty = false;
	let choices = copy(section.choices).map((c) => ({ ...c, userData: null }));

	const handleSubmit = () => {
		const items: PollResponseItem[] = choices.map((c) => ({ id: c.id, userData: c.userData }));
		dispatch('submit', items);
	};
</script>

<div
	use:dndzone={{ items: choices }}
	on:consider={(e) => {
		choices = e.detail.items;
		dirty = true;
	}}
	on:finalize={(e) => {
		choices = e.detail.items;
		dirty = true;
	}}
>
	{#each choices as choice, index (choice.id)}
		<span animate:flip={{ duration: 200 }}>
			<p>#{index + 1}</p>

			<Choice bind:userData={choice.userData} {choice} selected={false} />
		</span>
	{/each}
</div>

<Button on:click={handleSubmit} disabled={!dirty || $store.loading} icon={Checkmark}>
	Confirm
</Button>

<style>
	span {
		display: flex;
		align-items: center;
		gap: 16px;
		width: 100%;
	}
</style>
