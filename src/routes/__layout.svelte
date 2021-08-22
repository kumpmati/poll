<svelte:head>
	<title>Poll</title>
</svelte:head>

<main>
	<slot />
</main>

<style global>
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Urbanist:wght@400;800&display=swap');

	body {
		font-family: 'Open Sans';
	}

	main {
		max-width: 40rem;
		margin: 0 auto;
		padding: 1rem;
	}
</style>
