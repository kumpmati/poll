<script lang="ts">
	import type { PollSection } from '$lib/schemas/poll';
	import { sectionTypeLabel } from '$lib/utils';
	import DatesForm from './section/DatesForm.svelte';
	import MultipleChoiceForm from './section/MultipleChoiceForm.svelte';
	import OrderForm from './section/OrderForm.svelte';
	import SingleChoiceForm from './section/SingleChoiceForm.svelte';

	export let section: PollSection;
	export let showMeta: boolean;
</script>

{#if showMeta}
	<h3>{section.title}</h3>
{/if}

<p>{section.description}</p>
<br />
<br />

<p>{sectionTypeLabel(section.type)}</p>

<br />
<br />

{#key section.id}
	{#if section.type === 'singlechoice'}
		<SingleChoiceForm {section} on:submit />
	{:else if section.type === 'multiplechoice'}
		<MultipleChoiceForm {section} on:submit />
	{:else if section.type === 'order'}
		<OrderForm {section} on:submit />
	{:else if section.type === 'dates'}
		<DatesForm {section} on:submit />
	{/if}
{/key}

<style>
	p {
		opacity: 0.6;
		font-size: 14px;
	}
</style>
