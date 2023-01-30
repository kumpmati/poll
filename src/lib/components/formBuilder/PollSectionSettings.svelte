<script lang="ts">
	import type { PollChoice, PollSection } from '$lib/schemas/poll';
	import { copy, limit } from '$lib/util';
	import {
		FormGroup,
		TextInput,
		Toggle,
		TextArea,
		Button,
		RadioButtonGroup,
		AccordionItem,
		RadioButton,
		Modal,
		DatePicker,
		DatePickerInput
	} from 'carbon-components-svelte';
	import { TrashCan, Edit, Add, Draggable } from 'carbon-icons-svelte';
	import { nanoid } from 'nanoid';
	import { createEventDispatcher } from 'svelte';
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import type { Writable } from 'svelte/store';

	export let section: Writable<PollSection>;
	export let index: number;

	const dispatch = createEventDispatcher<{
		delete: string;
		modal: 'open' | 'close';
	}>();

	let open = false;
	let backup = copy($section);

	$: dispatch('modal', open ? 'open' : 'close');
	$: title = `${$section.title || 'Untitled section'} ${$section.required ? '*' : ''}`;

	/*
	 * Functions
	 */

	const handleOpen = (e: any) => {
		e.stopPropagation();
		backup = copy($section);
		open = true;
	};

	const handleCancel = () => {
		$section = backup;
		open = false;
	};

	const handleConfirm = () => {
		open = false;
		backup = copy($section);
	};

	const handleAddChoice = () => {
		$section.choices.push({ id: nanoid(), value: '' });
		$section.choices = $section.choices;
	};

	const handleRemoveChoice = (choice: PollChoice) => {
		$section.choices.splice($section.choices.indexOf(choice), 1);
		$section.choices = $section.choices;
	};

	const handleChangeDate = (e: any) => {
		const [from, to] = e.detail.selectedDates;

		$section.choices = [
			{ id: 'from', value: from ?? null },
			{ id: 'to', value: to ?? null }
		];
	};
</script>

<AccordionItem {title}>
	<span slot="title">
		<div class="description">
			<h5>{title}</h5>
			<div>{limit($section.description || '<no description>', 25)}</div>
		</div>

		<div>
			<Button on:click={handleOpen} icon={Edit} iconDescription="Edit" />
			<Button
				kind="danger"
				on:click={(e) => {
					e.stopPropagation();
					dispatch('delete', $section.id);
				}}
				icon={TrashCan}
				iconDescription="Remove"
			/>
		</div>
	</span>

	<p>Required: {$section.required ? 'Yes' : 'No'}</p>
	<p>Mode: {$section.mode}</p>
	<p>Choices: {$section.choices.map((c) => c.value).join(', ')}</p>
</AccordionItem>

<Modal
	bind:open
	hasForm
	modalHeading="Edit section"
	primaryButtonText="Save"
	secondaryButtonText="Cancel"
	on:click:button--primary={handleConfirm}
	on:click:button--secondary={handleCancel}
	on:close={handleCancel}
>
	<div class="content">
		<Toggle size="sm" bind:toggled={$section.required} labelText="Required" />

		<br />

		<FormGroup legendText="Info">
			<TextInput bind:value={$section.title} placeholder="Section {index + 1} title" />
			<TextArea bind:value={$section.description} placeholder="Section {index + 1} description" />
		</FormGroup>

		<RadioButtonGroup legendText="Mode" bind:selected={$section.mode}>
			<RadioButton labelText="Single choice" value="singlechoice" />
			<RadioButton labelText="Multiple choice" value="multiplechoice" />
			<RadioButton labelText="Order" value="order" />
			<RadioButton labelText="Choose dates" value="date" />
		</RadioButtonGroup>

		<br />

		<FormGroup legendText="Choices">
			{#if $section.mode === 'date'}
				<DatePicker dateFormat="d/m/y" datePickerType="range" on:change={handleChangeDate}>
					<DatePickerInput labelText="From" placeholder="dd/mm/yyyy" />
					<DatePickerInput labelText="To" placeholder="dd/mm/yyyy" />
				</DatePicker>
			{:else}
				<div
					use:dndzone={{ items: $section.choices, type: 'choices' }}
					on:consider={(e) => ($section.choices = e.detail.items)}
					on:finalize={(e) => ($section.choices = e.detail.items)}
				>
					{#each $section.choices as choice (choice.id)}
						<div class="choice" animate:flip={{ duration: 200 }}>
							<Button
								kind="secondary"
								icon={Draggable}
								size="field"
								iconDescription="Drag choice"
							/>
							<TextInput bind:value={choice.value} />
							<Button
								kind="danger"
								icon={TrashCan}
								size="field"
								iconDescription="Remove"
								on:click={() => handleRemoveChoice(choice)}
							/>
						</div>
					{/each}
				</div>

				<Button kind="ghost" size="field" icon={Add} on:click={handleAddChoice}>Add choice</Button>
			{/if}
		</FormGroup>
	</div>
</Modal>

<style>
	span {
		display: flex;
		justify-content: space-between;
	}

	.choice {
		display: flex;
	}
</style>
