<script lang="ts">
	import type { Option } from '$lib/types/poll';

	export let options: Option[];
	export let selection: string[];

	let selectedItem: string;

	$: {
		if (selectedItem) selection = [selectedItem];
		else selection = [];
	}
</script>

<ul>
	{#each options as { id, text } (id)}
		<label>
			<input type="radio" value={id} bind:group={selectedItem} />
			{text}
		</label>
	{/each}
</ul>

<style>
	ul {
		padding: 0;
	}

	label {
		display: flex;
		align-items: center;
		font-size: 1.35rem;
		padding: 0.5rem;
		padding-left: 0;
		width: 100%;
		border-radius: 0.25rem;
	}

	label > input {
		width: 1.5rem;
		min-width: 1.5rem;
		height: 1.5rem;
		margin-right: 0.5rem;
	}
</style>
