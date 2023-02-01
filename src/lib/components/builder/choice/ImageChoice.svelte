<script lang="ts">
	import type { ChoiceBuilderStore } from '$lib/stores/builder/choice';
	import { TextInput } from 'carbon-components-svelte';

	export let builder: ChoiceBuilderStore<'image', string>;

	$: if (typeof $builder.data !== 'string') {
		$builder.data = '';
	}
</script>

<TextInput bind:value={$builder.data} placeholder="Image URL" />
