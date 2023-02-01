<script lang="ts">
	import type { SectionBuilderStore } from '$lib/stores/builder/section';
	import { sectionTypeLabel } from '$lib/util';
	import {
		AccordionItem,
		Button,
		Column,
		FormGroup,
		Grid,
		Modal,
		RadioButton,
		RadioButtonGroup,
		Row
	} from 'carbon-components-svelte';
	import {
		Add,
		Calendar,
		Edit,
		Image,
		StringText,
		TextIndent,
		TrashCan
	} from 'carbon-icons-svelte';
	import { createEventDispatcher } from 'svelte';
	import DateChoiceSection from './DateChoiceSection.svelte';
	import MultipleChoiceSection from './MultipleChoiceSection.svelte';
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
	<svelte:fragment slot="title">
		<h5>Section {index + 1}</h5>
		<p>{sectionTypeLabel($builder.type)}</p>
	</svelte:fragment>

	<RadioButtonGroup bind:selected={$builder.type} legendText="Section type">
		<RadioButton value="singlechoice" labelText="Single choice" />
		<RadioButton value="multiplechoice" labelText="Multiple choice" />
	</RadioButtonGroup>

	<br />

	<Button size="field" icon={Edit} on:click={openModal}>Edit</Button>
	<Button
		kind="danger"
		size="field"
		icon={TrashCan}
		on:click={() => dispatch('delete', $builder.id)}
	>
		Remove
	</Button>

	<Modal
		open={modalOpen}
		hasForm
		size="sm"
		passiveModal
		modalLabel={sectionTypeLabel($builder.type)}
		modalHeading="Section {index + 1}"
		primaryButtonText="Save"
		secondaryButtonText="Cancel"
		on:click:button--primary={closeModal}
		on:click:button--secondary={closeModal}
		on:close={closeModal}
		style="overflow: visible;"
	>
		<br />
		<FormGroup legendText="Choices">
			{#if $builder.type === 'singlechoice'}
				<SingleChoiceSection {builder} />
			{:else if $builder.type === 'multiplechoice'}
				<MultipleChoiceSection {builder} />
			{:else if $builder.type === 'date'}
				<DateChoiceSection {builder} />
			{/if}
		</FormGroup>

		<Button kind="ghost" size="field" on:click={() => builder.addChoice('string', '')} icon={Add}>
			Add choice
		</Button>
	</Modal>
</AccordionItem>

<style>
	p {
		font-size: 12px;
		opacity: 0.5;
	}
</style>
