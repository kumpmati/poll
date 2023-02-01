<script lang="ts">
	import type { SectionBuilderStore } from '$lib/stores/builder/section';
	import { Button, FormGroup } from 'carbon-components-svelte';
	import { Add } from 'carbon-icons-svelte';
	import ChoiceBuilder from '../choice/ChoiceBuilder.svelte';

	export let builder: SectionBuilderStore<'multiplechoice', any, any>;
</script>

<FormGroup legendText="Choices">
	{#each $builder.choices as choice (choice.id)}
		<ChoiceBuilder builder={choice.builder} on:delete={(e) => builder.removeChoice(e.detail)} />
	{/each}

	<br />

	<Button kind="ghost" size="field" on:click={() => builder.addChoice('string', '')} icon={Add}>
		Add choice
	</Button>
</FormGroup>
