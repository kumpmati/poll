<script lang="ts">
	import type { PollSection } from '$lib/schemas/poll';
	import { hasDuplicateInArray, hasDuplicates } from '$lib/util';
	import { Button, DatePicker, DatePickerInput } from 'carbon-components-svelte';
	import { Add, Checkmark, TrashCan } from 'carbon-icons-svelte';
	import { createEventDispatcher } from 'svelte';

	export let section: PollSection;

	const dispatch = createEventDispatcher();

	const { limit, range } = section.choices[0].data;

	let selected: string[] = [];

	const handleSubmit = () => {
		dispatch('submit', selected);
	};

	$: console.log(selected);

	const handleAddDate = () => {
		selected.push('');
		selected = selected;
	};

	const handleDeleteDate = (index: number) => {
		selected.splice(index, 1);
		selected = selected;
	};

	$: duplicates = hasDuplicates(selected);
	$: noItems = selected.length === 0;
</script>

<div>
	{#each selected as date, index}
		{@const dup = hasDuplicateInArray(selected, date)}
		<span>
			<DatePicker
				flatpickrProps={{ static: false }}
				datePickerType="single"
				bind:value={date}
				dateFormat="Y-m-d"
				minDate={limit ? range.from : undefined}
				maxDate={limit ? range.to : undefined}
			>
				<DatePickerInput
					invalid={dup || date === ''}
					invalidText={dup ? "Can't enter same date twice" : date === '' ? 'Choose a date' : ''}
				/>
			</DatePicker>

			<Button
				kind="danger-ghost"
				size="field"
				icon={TrashCan}
				iconDescription="Remove"
				on:click={() => handleDeleteDate(index)}
			/>
		</span>

		<br />
	{/each}

	<Button kind="ghost" size="field" on:click={handleAddDate} icon={Add}>Add date</Button>
</div>

<br />

<Button on:click={handleSubmit} disabled={duplicates || noItems} icon={Checkmark}>Submit</Button>

<style>
	div {
		display: block;
	}

	span {
		display: flex;
		width: fit-content;
	}
</style>
