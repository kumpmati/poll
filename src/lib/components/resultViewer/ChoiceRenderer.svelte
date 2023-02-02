<script lang="ts">
	import type { PollChoice } from '$lib/schemas/poll';
	import { Button, Modal } from 'carbon-components-svelte';
	import { Add, Subtract } from 'carbon-icons-svelte';

	export let value: any;
	export let type: PollChoice['type'];
	export let imageLabel: string = '';

	let open = false;
</script>

{#if type === 'string'}
	<p>{value}</p>
{:else if type === 'date'}
	<p>{new Date(value).toLocaleDateString('fi')}</p>
{:else if type === 'image'}
	<p>Image <span class="subtle">(#{imageLabel})</span></p>

	<Button size="small" kind="ghost" on:click={() => (open = !open)} icon={open ? Subtract : Add}>
		{open ? 'Hide' : 'Show'}
	</Button>
{/if}

{#if type === 'image'}
	<Modal bind:open passiveModal modalHeading="Image ({imageLabel})" size="sm">
		<img src={value} alt={null} />
	</Modal>
{/if}

<style>
	p {
		white-space: nowrap;
	}

	.subtle {
		font-size: 12px;
		opacity: 0.6;
	}

	img {
		width: 99%;
		height: 99%;
		object-fit: contain;
		padding: 0;
		margin: 0;
	}
</style>
