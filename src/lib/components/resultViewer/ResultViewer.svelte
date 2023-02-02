<script lang="ts">
	import type { Poll } from '$lib/schemas/poll';
	import type { PollStatistics } from '$lib/utils/statistics';
	import { Accordion, Button, FormGroup } from 'carbon-components-svelte';
	import { Add, Subtract } from 'carbon-icons-svelte';
	import SectionResultsViewer from './SectionResultsViewer.svelte';

	export let poll: Poll;
	export let statistics: PollStatistics;

	let open = poll.sections.length === 1;
</script>

<h1>Results</h1>

<br />
<br />

<FormGroup legendText="Poll details">
	<h3>{poll.meta.title}</h3>
	<p>{poll.meta.description}</p>
</FormGroup>

<FormGroup legendText="Responses">
	<span class="expand">
		<Button kind="ghost" size="small" on:click={() => (open = !open)} icon={open ? Subtract : Add}>
			{open ? 'Expand all' : 'Collapse all'}
		</Button>
	</span>

	<Accordion label="Statistics per section" size="xl" align="start">
		{#each poll.sections as section (section.id)}
			<SectionResultsViewer {section} {statistics} {open} />
		{/each}
	</Accordion>
</FormGroup>

<style>
	.expand {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 4px;
	}
</style>
