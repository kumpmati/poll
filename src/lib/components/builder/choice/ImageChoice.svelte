<script lang="ts">
	import type { ChoiceBuilderStore } from '$lib/stores/builder/choice';
	import { isURL } from '$lib/utils';
	import { TextInput } from 'carbon-components-svelte';

	export let builder: ChoiceBuilderStore;

	$: if (typeof $builder.data !== 'string') {
		$builder.data = '';
	}

	$: invalid = !isURL($builder.data);
</script>

<TextInput type="url" bind:value={$builder.data} {invalid} placeholder="Image URL" />
