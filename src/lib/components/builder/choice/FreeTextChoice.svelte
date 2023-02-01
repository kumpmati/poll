<script lang="ts">
	import type { ChoiceBuilderStore } from '$lib/stores/builder/choice';
	import { TextInput } from 'carbon-components-svelte';

	export let builder: ChoiceBuilderStore<'freetext', { label: string }>;

	$: if (typeof $builder.data !== 'object') {
		$builder.data = { label: 'Other' };
	}

	$: invalid = $builder.data.label.length === 0;
</script>

<TextInput bind:value={$builder.data.label} {invalid} placeholder="Label" />
