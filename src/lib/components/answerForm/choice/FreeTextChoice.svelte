<script lang="ts">
	import type { PollChoice } from '$lib/schemas/poll';
	import { TextArea } from 'carbon-components-svelte';

	export let choice: PollChoice;
	export let value: string;
</script>

<span>
	<p>{choice.data}:</p>
	<br />
	<TextArea bind:value />
</span>

<style>
	span {
		display: flex;
		flex-direction: column;
	}
</style>
