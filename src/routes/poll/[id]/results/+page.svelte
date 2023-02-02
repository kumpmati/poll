<script lang="ts">
	import ResultViewer from '$lib/components/resultViewer/ResultViewer.svelte';
	import { Button } from 'carbon-components-svelte';
	import { ArrowLeft } from 'carbon-icons-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<ResultViewer poll={data.poll} statistics={data.statistics} />

<Button href="/poll/{data.poll.id}" icon={ArrowLeft}>Back to poll</Button>
