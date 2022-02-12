<script context="module">
  export const prerender = true;
</script>

<script>
  import PollCreatorForm from '$lib/components/PollCreatorForm/PollCreatorForm.svelte';
</script>

<svelte:head>
  <title>Poll</title>
</svelte:head>

<h1>POLL</h1>

<PollCreatorForm />

<style>
  h1 {
    font-family: 'Urbanist';
    font-size: 5rem;
    font-weight: 400;
  }
</style>
