<script lang="ts">
	import type { SectionBuilderStore } from '$lib/stores/builder/section';
	import { Button, FormGroup } from 'carbon-components-svelte';
	import { Add } from 'carbon-icons-svelte';
	import EditChoice from '../choice/EditChoice.svelte';

	export let builder: SectionBuilderStore<'date', string, any>;
</script>

<FormGroup legendText="Choices">
	{#each $builder.choices as choice (choice.id)}
		<EditChoice builder={choice.builder} on:delete={(e) => builder.removeChoice(e.detail)} />
	{/each}

	<br />

	<Button kind="ghost" size="field" on:click={() => builder.addChoice('string', '')} icon={Add}>
		Add choice
	</Button>
</FormGroup>
