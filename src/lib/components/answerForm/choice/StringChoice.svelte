<script lang="ts">
	import type { PollChoice } from '$lib/schemas/poll';

	export let choice: PollChoice;
</script>

<p>{choice.data}</p>
