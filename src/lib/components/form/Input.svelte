<script lang="ts">
	export let value: any;
	export let label: string | undefined;
	export let type: string;

	const useAction = (node: any) => {
		node.type = type;
	};
</script>

<label>
	<input bind:value use:useAction type="checkbox" on:change />
	{label}
</label>

<style>
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
