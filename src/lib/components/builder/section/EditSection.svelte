<script lang="ts">
	import type { SectionBuilderStore } from '$lib/stores/builder/section';
	import { sectionTypeLabel } from '$lib/util';
	import { AccordionItem, Button, Dropdown, FormGroup, Modal } from 'carbon-components-svelte';
	import { Add, Edit, Pen, TrashCan } from 'carbon-icons-svelte';
	import { createEventDispatcher } from 'svelte';
	import DateSection from './DateSection.svelte';
	import MultipleChoiceSection from './MultipleChoiceSection.svelte';
	import OrderSection from './OrderSection.svelte';
	import SingleChoiceSection from './SingleChoiceSection.svelte';

	export let index: number;
	export let builder: SectionBuilderStore<any, any, any>;

	const dispatch = createEventDispatcher();
	let modalOpen = false;

	const openModal = () => {
		modalOpen = true;
	};

	const closeModal = () => {
		modalOpen = false;
	};
</script>

<AccordionItem title="Section {index + 1}">
	<div slot="title" class="title">
		<div>
			<h5>Section {index + 1}</h5>
			<p>{sectionTypeLabel($builder.type)} ({$builder.choices.length} choices)</p>
		</div>
	</div>

	<Button size="field" icon={Edit} on:click={openModal}>Edit</Button>
	<Button
		kind="danger"
		size="field"
		icon={TrashCan}
		on:click={() => dispatch('delete', $builder.id)}
	>
		Remove
	</Button>
</AccordionItem>

<Modal
	open={modalOpen}
	hasForm
	hasScrollingContent
	passiveModal
	modalLabel={sectionTypeLabel($builder.type)}
	modalHeading="Section {index + 1}"
	primaryButtonText="Save"
	secondaryButtonText="Cancel"
	on:click:button--primary={closeModal}
	on:click:button--secondary={closeModal}
	on:close={closeModal}
>
	<Dropdown
		titleText="Section type"
		bind:selectedId={$builder.type}
		items={[
			{ id: 'singlechoice', text: 'Single choice' },
			{ id: 'multiplechoice', text: 'Multiple choice' },
			{ id: 'order', text: 'Order' },
			{ id: 'dates', text: 'Find a common date' }
		]}
	/>

	<br />

	{#if $builder.type === 'singlechoice'}
		<SingleChoiceSection {builder} />
	{:else if $builder.type === 'multiplechoice'}
		<MultipleChoiceSection {builder} />
	{:else if $builder.type === 'dates'}
		<DateSection {builder} />
	{:else if $builder.type === 'order'}
		<OrderSection {builder} />
	{/if}
</Modal>

<style>
	p {
		font-size: 12px;
		opacity: 0.5;
	}

	.title {
		display: flex;
		justify-content: space-between;
	}
</style>
