<script lang="ts">
	import type { PollChoice } from '$lib/schemas/poll';
	import { Calendar } from 'carbon-icons-svelte';

	export let choice: PollChoice;
</script>

<span>
	<Calendar />
	<p>{choice.data}</p>
</span>

<style>
	span {
		display: flex;
		align-items: center;
		gap: 8px;
	}
</style>
