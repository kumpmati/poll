<script lang="ts">
	import type { SectionBuilderStore } from '$lib/stores/builder/section';
	import { FormGroup, Toggle } from 'carbon-components-svelte';
	import ChoiceBuilder from '../choice/ChoiceBuilder.svelte';

	export let builder: SectionBuilderStore;

	const range = builder.addChoice('daterange', { limit: false, range: { from: '', to: '' } });
</script>

<br />

<FormGroup legendText="Limit dates">
	<Toggle bind:toggled={$range.data.limit} label="Limit dates" labelA="No" labelB="Yes" />

	<br />

	{#if $range.data.limit}
		<ChoiceBuilder builder={range} allowedTypes={['date']} />
	{/if}
</FormGroup>
