<script lang="ts">
	import type { PollChoice } from '$lib/schemas/poll';
	import { Button } from 'carbon-components-svelte';
	import { Add, Subtract } from 'carbon-icons-svelte';

	export let choice: PollChoice;
	export let open: boolean;
	export let imageLabel: string;
</script>

<div>
	<span>
		<img src={choice.data} alt="#{imageLabel}" />
		<p><span class="subtle">#{imageLabel}</span></p>
	</span>

	<Button
		size="small"
		kind="ghost"
		on:click={(e) => {
			e.stopPropagation();
			open = !open;
		}}
		icon={open ? Subtract : Add}
	>
		{open ? 'Hide full image' : 'Show full image'}
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

	span {
		display: flex;
		flex-direction: row;
		gap: 16px;
		align-items: center;
		margin-right: auto;
	}

	.subtle {
		opacity: 0.6;
		font-size: 12px;
	}

	img {
		height: 4rem;
		max-width: 4rem;
		object-fit: contain;
	}
</style>
