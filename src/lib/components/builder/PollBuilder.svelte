<script lang="ts">
	import type { Poll } from '$lib/schemas/poll';
	import type { PollBuilderStore } from '$lib/stores/builder/poll';
	import {
		Accordion,
		Button,
		Form,
		FormGroup,
		TextArea,
		TextInput
	} from 'carbon-components-svelte';
	import { Add, CheckmarkFilled } from 'carbon-icons-svelte';
	import { createEventDispatcher } from 'svelte';
	import SectionBuilder from './section/SectionBuilder.svelte';

	const dispatch = createEventDispatcher<{ submit: Poll }>();

	export let builder: PollBuilderStore;

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		const output = builder.build();
		dispatch('submit', output);
	};
</script>

<Form on:submit={handleSubmit}>
	<FormGroup legendText="Meta">
		<TextInput bind:value={$builder.meta.title} placeholder="Title" />
		<TextArea bind:value={$builder.meta.description} placeholder="Description (optional)" />
	</FormGroup>

	<FormGroup legendText="Sections">
		<Accordion align="start">
			{#each $builder.sections as section, index (section.id)}
				<SectionBuilder
					{index}
					builder={section.builder}
					on:delete={(e) => builder.removeSection(e.detail)}
				/>
			{/each}

			<br />

			<Button
				kind="ghost"
				size="field"
				on:click={() => builder.addSection('singlechoice')}
				icon={Add}
			>
				Add section
			</Button>
		</Accordion>
	</FormGroup>

	<Button on:click={handleSubmit} icon={CheckmarkFilled}>Create poll</Button>
</Form>
