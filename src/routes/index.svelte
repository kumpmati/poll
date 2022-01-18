<script context="module">
	export const prerender = true;
</script>

<script>
	import PollCreateForm from '$lib/components/PollCreateForm.svelte';
</script>

<h1>POLL</h1>

<PollCreateForm />

<style>
	h1 {
		font-family: 'Urbanist';
		font-size: 5rem;
		font-weight: 400;
	}
</style>
