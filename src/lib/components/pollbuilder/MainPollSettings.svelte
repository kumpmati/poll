<script lang="ts">
	import {
		FormGroup,
		TextInput,
		TextArea,
		Select,
		SelectItem,
		Toggle,
		Grid,
		Row,
		Column
	} from 'carbon-components-svelte';
	import type { PollStore } from '$lib/stores/poll';

	export let store: PollStore;
</script>

<FormGroup legendText="Info">
	<TextInput bind:value={$store.title} placeholder="Title" required />
	<TextArea bind:value={$store.description} placeholder="Description (optional)" />

	<Grid noGutter padding>
		<Row>
			<Column>
				<Select labelText="Mode" bind:selected={$store.mode} required>
					<SelectItem value="normal" text="All sections in normal order" />
					<SelectItem value="random" text="All sections in random order" />
					<SelectItem value="singlerandom" text="One random section" />
				</Select>
			</Column>
		</Row>
		<Row>
			<Column>
				<Toggle
					bind:selected={$store.allowMultipleSubmissions}
					labelText="Allow multiple submissions"
					labelA="No"
					labelB="Yes"
				/>
			</Column>

			<Column>
				<Toggle
					bind:selected={$store.requireAuth}
					labelText="Require authentication"
					labelA="No"
					labelB="Yes"
				/>
			</Column>
		</Row>
	</Grid>
</FormGroup>

<style>
</style>
