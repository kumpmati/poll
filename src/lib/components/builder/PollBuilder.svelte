<script lang="ts">
	import type { PollBuilderStore } from '$lib/stores/builder/poll';
	import type { PollOutput } from '$lib/types/poll';
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
	import EditSection from './section/EditSection.svelte';

	const dispatch = createEventDispatcher<{ submit: PollOutput<any, any, any> }>();

	export let builder: PollBuilderStore<string, string, any>;

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
				<EditSection
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
