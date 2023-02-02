<script lang="ts">
	import type { Poll } from '$lib/schemas/poll';
	import { sectionTypeLabel } from '$lib/utils';
	import type { PollStatistics } from '$lib/utils/statistics';
	import { Accordion, AccordionItem, Button, FormGroup } from 'carbon-components-svelte';
	import { Add, Subtract } from 'carbon-icons-svelte';
	import SectionResultsViewer from './SectionResultsViewer.svelte';

	export let poll: Poll;
	export let statistics: PollStatistics;

	let open = false;
</script>

<h1>Responses</h1>

<br />
<br />

<FormGroup legendText="Poll details">
	<h4>{poll.meta.title}</h4>
	<p>{poll.meta.description}</p>
</FormGroup>

{#if poll.sections.length > 1}
	<FormGroup legendText="Responses">
		<span class="expand">
			<Button
				kind="ghost"
				size="small"
				on:click={() => (open = !open)}
				icon={open ? Subtract : Add}
			>
				{open ? 'Collapse all' : 'Expand all'}
			</Button>
		</span>

		<Accordion label="Statistics per section" size="xl" align="start">
			{#each poll.sections as section (section.id)}
				<AccordionItem {open} title={section.title}>
					<svelte:fragment slot="title">
						<h4>{section.title}</h4>
						<p>{sectionTypeLabel(section.type)}</p>
					</svelte:fragment>

					<SectionResultsViewer {section} {statistics} />
				</AccordionItem>
			{/each}
		</Accordion>
	</FormGroup>
{:else}
	<p>{sectionTypeLabel(poll.sections[0].type)}</p>
	<br />

	<SectionResultsViewer section={poll.sections[0]} {statistics} />
{/if}

<br />

<style>
	.expand {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 4px;
	}

	p {
		opacity: 0.6;
		font-size: 12px;
	}
</style>
