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
		background: var(--background);
		color: var(--text);
	}

	main {
		max-width: 40rem;
		margin: 0 auto;
		padding: 1rem;
		margin-bottom: 5rem;
	}

	@media (prefers-color-scheme: dark) {
		:global(:root) {
			--background: #222;
			--text: #dddddd;
			--text-subtle: #aaa;
			--text-inverted: #333;
			--text-inverted-subtle: #333;
			--red: rgb(255, 98, 98);
			--red-subtle: rgba(255, 194, 194, 0.75);
		}
	}

	@media (prefers-color-scheme: light) {
		:global(:root) {
			--background: #fff;
			--text: #333;
			--text-subtle: #555;
			--text-inverted: #dddddd;
			--text-inverted-subtle: #333;
			--red: rgb(255, 98, 98);
			--red-subtle: rgba(255, 194, 194, 0.75);
		}
	}
</style>
