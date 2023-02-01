<script lang="ts">
	import type { SectionBuilderStore } from '$lib/stores/builder/section';
	import { FormGroup, Toggle } from 'carbon-components-svelte';
	import EditChoice from '../choice/EditChoice.svelte';

	export let builder: SectionBuilderStore<
		'date',
		'daterange',
		{ limit: boolean; range: { from: string; to: string } }
	>;

	const range = builder.addChoice('daterange', { limit: false, range: { from: '', to: '' } });
</script>

<br />

<FormGroup legendText="Limit dates">
	<Toggle bind:toggled={$range.data.limit} label="Limit dates" labelA="No" labelB="Yes" />

	<br />

	{#if $range.data.limit}
		<EditChoice builder={range} allowedTypes={['date']} />
	{/if}
</FormGroup>
