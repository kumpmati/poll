<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	console.log(data);
</script>

<main>
	{data.meta.title}
</main>

<style>
	main {
		padding: 1rem;
		margin: 0 auto;
		max-width: 40rem;
		margin-top: 4rem;
		margin-bottom: 4rem;

		overflow: hidden;
	}
</style>
