<script lang="ts">
	import type { SectionBuilderStore } from '$lib/stores/builder/section';
	import EditChoice from '../choice/EditChoice.svelte';

	export let builder: SectionBuilderStore<'date', 'date', any>;
</script>

{#each $builder.choices as choice (choice.id)}
	<EditChoice builder={choice.builder} on:delete={(e) => builder.removeChoice(e.detail)} />
{/each}
