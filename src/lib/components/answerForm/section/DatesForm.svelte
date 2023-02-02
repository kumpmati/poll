<script lang="ts">
	import type { PollResponseItem, PollSection } from '$lib/schemas/poll';
	import { POLL_FORM_STORE, type PollFormStore } from '$lib/stores/form/pollForm';
	import { hasDuplicateInArray, hasDuplicates } from '$lib/utils';
	import { Button, DatePicker, DatePickerInput } from 'carbon-components-svelte';
	import { Add, Checkmark, TrashCan } from 'carbon-icons-svelte';
	import { nanoid } from 'nanoid';
	import { createEventDispatcher, getContext } from 'svelte';

	export let section: PollSection;

	const store = getContext<PollFormStore>(POLL_FORM_STORE);
	const dispatch = createEventDispatcher<{ submit: PollResponseItem[] }>();

	const { limit, range } = section.choices[0].data;

	let selected: PollResponseItem[] = [];

	const handleSubmit = () => {
		dispatch('submit', selected);
	};

	const handleAddDate = () => {
		selected.push({ id: nanoid(), userData: '' });
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
	{#each selected as item, index}
		{@const dup = hasDuplicateInArray(selected, item)}
		<span>
			<DatePicker
				flatpickrProps={{ static: false }}
				datePickerType="single"
				bind:value={item.userData}
				dateFormat="Y-m-d"
				minDate={limit ? range.from : undefined}
				maxDate={limit ? range.to : undefined}
			>
				<DatePickerInput
					invalid={dup || item.userData === ''}
					invalidText={dup
						? "Can't enter same date twice"
						: item.userData === ''
						? 'Choose a date'
						: ''}
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

<Button on:click={handleSubmit} disabled={duplicates || noItems || $store.loading} icon={Checkmark}>
	Confirm
</Button>

<style>
	div {
		display: block;
	}

	span {
		display: flex;
		width: fit-content;
	}
</style>
