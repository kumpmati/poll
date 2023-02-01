<script lang="ts">
	import type { ChoiceBuilderStore } from '$lib/stores/builder/choice';
	import { DatePicker, DatePickerInput } from 'carbon-components-svelte';

	export let builder: ChoiceBuilderStore<'date', string>;

	$: if (typeof $builder.data !== 'string') {
		$builder.data = '';
	}
</script>

<DatePicker datePickerType="single" bind:value={$builder.data} dateFormat="Y/m/d">
	<DatePickerInput placeholder="Date" />
</DatePicker>
