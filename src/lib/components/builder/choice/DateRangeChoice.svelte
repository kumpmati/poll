<script lang="ts">
	import type { ChoiceBuilderStore } from '$lib/stores/builder/choice';
	import { DatePicker, DatePickerInput } from 'carbon-components-svelte';

	export let builder: ChoiceBuilderStore;

	$: if (typeof $builder.data !== 'object') {
		$builder.data = { limit: false, range: { from: '', to: '' } };
	}
</script>

<DatePicker
	datePickerType="range"
	bind:valueFrom={$builder.data.range.from}
	bind:valueTo={$builder.data.range.to}
	dateFormat="Y/m/d"
>
	<DatePickerInput placeholder="From" />
	<DatePickerInput placeholder="To" />
</DatePicker>
