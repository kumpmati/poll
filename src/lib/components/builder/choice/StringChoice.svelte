<script lang="ts">
	import type { ChoiceBuilderStore } from '$lib/stores/builder/choice';
	import { TextInput } from 'carbon-components-svelte';

	export let builder: ChoiceBuilderStore;

	$: if (typeof $builder.data !== 'string') {
		$builder.data = '';
	}

	$: invalid = $builder.data.length === 0;
</script>

<TextInput bind:value={$builder.data} {invalid} placeholder="Label" />
