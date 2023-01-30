<script lang="ts">
	import { goto } from '$app/navigation';
	import MainPollSettings from '$lib/components/form/MainPollSettings.svelte';
	import PollSectionSettings from '$lib/components/form/PollSectionSettings.svelte';
	import type { Poll } from '$lib/schemas/poll';
	import {
		createMainPollStore,
		createPollSectionStore,
		type PollSectionStore
	} from '$lib/stores/poll';
	import { Accordion, Button, Form, FormGroup } from 'carbon-components-svelte';
	import { Add, CheckmarkFilled } from 'carbon-icons-svelte';
	import { nanoid } from 'nanoid';
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import { get } from 'svelte/store';

	const store = createMainPollStore({
		id: nanoid(6),
		title: 'My poll',
		description: '',
		author: 'public',
		publishedAt: Date.now(),
		mode: 'normal',
		requireAuth: false,
		allowMultipleSubmissions: false
	});

	let sections: PollSectionStore[] = [
		createPollSectionStore({
			id: nanoid(),
			title: 'Section 1',
			description: '',
			mode: 'singlechoice',
			required: true,
			choices: []
		})
	];

	let modalOpen = false;

	const handleAddSection = () => {
		sections.push(
			createPollSectionStore({
				id: nanoid(),
				title: `Section ${sections.length + 1}`,
				description: '',
				mode: 'singlechoice',
				required: true,
				choices: []
			})
		);

		sections = sections;
	};

	const handleRemoveSection = (id: string) => {
		const index = sections.findIndex((s) => s.id === id);
		if (index === -1) return;

		sections.splice(index, 1);
		sections = sections;
	};

	const handleSubmitPoll = async (e: Event) => {
		e.preventDefault();

		const poll: Poll = {
			...$store,
			sections: sections.map((s) => get(s.store))
		};

		const response = await fetch('/new', {
			method: 'POST',
			body: JSON.stringify(poll)
		});

		if (response.ok) {
			await goto(`/poll/${poll.id}`);
		}
	};
</script>

<main>
	<h1>New poll</h1>

	<Form on:submit={handleSubmitPoll}>
		<MainPollSettings {store} on:submit={() => console.log($store)} />

		<FormGroup legendText="Sections">
			<Accordion size="xl" align="start">
				<span
					use:dndzone={{ items: sections, type: 'sections', dragDisabled: modalOpen }}
					on:consider={(e) => (sections = e.detail.items)}
					on:finalize={(e) => (sections = e.detail.items)}
				>
					{#each sections as section, index (section.id)}
						<div animate:flip={{ duration: 200 }}>
							<PollSectionSettings
								section={section.store}
								{index}
								on:delete={(e) => handleRemoveSection(e.detail)}
								on:modal={(e) => (modalOpen = e.detail === 'open')}
							/>
						</div>
					{/each}
				</span>
			</Accordion>

			<Button kind="ghost" size="field" on:click={handleAddSection} icon={Add}>Add section</Button>
		</FormGroup>

		<Button kind="primary" size="lg" icon={CheckmarkFilled} on:click={handleSubmitPoll}>
			Create Poll
		</Button>
	</Form>
</main>

<style>
	h1 {
		margin-bottom: 2rem;
	}

	main {
		padding: 1rem;
		margin: 0 auto;
		max-width: 40rem;
		margin-top: 4rem;
		margin-bottom: 4rem;

		overflow: hidden;
	}
</style>
