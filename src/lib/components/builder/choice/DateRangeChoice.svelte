<script lang="ts">
	import type { ChoiceBuilderStore } from '$lib/stores/builder/choice';
	import { DatePicker, DatePickerInput } from 'carbon-components-svelte';

	export let builder: ChoiceBuilderStore<'daterange', { from: string; to: string }>;

	$: if (typeof $builder.data !== 'object') {
		$builder.data = { from: '', to: '' };
	}
</script>

<DatePicker
	datePickerType="range"
	bind:valueFrom={$builder.data.from}
	bind:valueTo={$builder.data.to}
	dateFormat="Y/m/d"
>
	<DatePickerInput placeholder="From" />
	<DatePickerInput placeholder="To" />
</DatePicker>
