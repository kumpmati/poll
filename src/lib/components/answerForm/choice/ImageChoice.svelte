<script lang="ts">
	import { Button } from 'carbon-components-svelte';
	import { Add, Subtract } from 'carbon-icons-svelte';

	export let open: boolean;
	export let imageLabel: string;
</script>

<div>
	<p>Image <span class="subtle">(#{imageLabel})</span></p>

	<Button
		size="small"
		kind="ghost"
		on:click={(e) => {
			e.stopPropagation();
			open = !open;
		}}
		icon={open ? Subtract : Add}
	>
		{open ? 'Hide' : 'Show'}
	</Button>
</div>

<style>
	div {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 16px;
		width: 100%;
		position: relative;
	}

	.subtle {
		opacity: 0.6;
		font-size: 12px;
	}
</style>
