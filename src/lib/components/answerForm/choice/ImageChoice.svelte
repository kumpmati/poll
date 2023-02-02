<script lang="ts">
	import type { PollChoice } from '$lib/schemas/poll';

	export let choice: PollChoice;
</script>

<span>
	<img loading="lazy" src={choice.data} alt={null} />
</span>

<style>
	span {
		display: flex;
		align-items: center;
		gap: 16px;
	}
</style>
