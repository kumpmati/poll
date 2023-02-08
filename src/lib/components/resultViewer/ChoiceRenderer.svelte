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
	<span class="img-container">
		<span class="row">
			<img class="thumbnail" src={value} alt="#{imageLabel}" />
			<p><span class="subtle">#{imageLabel}</span></p>
		</span>

		<span class="button">
			<Button
				size="small"
				kind="ghost"
				on:click={() => (open = !open)}
				icon={open ? Subtract : Add}
			>
				{open ? 'Hide original' : 'Show original'}
			</Button>
		</span>
	</span>
{/if}

{#if type === 'image'}
	<Modal bind:open passiveModal modalHeading="Image ({imageLabel})" size="sm">
		<img class="full-img" src={value} alt={null} />
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

	.thumbnail {
		height: 4rem;
		max-width: 6rem;
		object-fit: contain;
	}

	.img-container {
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
	}

	.row {
		display: flex;
		flex-direction: row;
		gap: 16px;
		align-items: center;
		margin-right: auto;
	}

	.full-img {
		width: 99%;
		height: 99%;
		object-fit: contain;
		padding: 0;
		margin: 0;
	}
</style>
