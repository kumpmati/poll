<script lang="ts">
	import type { ChoiceBuilderStore } from '$lib/stores/builder/choice';
	import { TextInput } from 'carbon-components-svelte';

	export let builder: ChoiceBuilderStore<'freetext', { min: number; max: number; label: string }>;

	$: if (typeof $builder.data !== 'object') {
		$builder.data = { min: 0, max: 0, label: 'Other' };
	}
</script>

<span>
	<TextInput bind:value={$builder.data.label} placeholder="Label" />
</span>

<style>
	span {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	div {
		display: flex;
	}
</style>
