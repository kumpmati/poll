<svelte:head>
	<title>Not Found</title>
</svelte:head>

<div>
	<h1>What, not found? 😳</h1>
	<p>You probably have an invalid link or the poll doesn't exist anymore.</p>
	<a href="/">Home</a>
</div>

<style>
	div {
		position: relative;
		top: 30vh;
		display: block;
		text-align: center;
	}
	h1 {
		margin: 0;
		font-size: 4rem;
		font-weight: 400;
	}

	p {
		color: var(--text-subtle);
	}

	a {
		position: relative;
		top: 2rem;
		background: rgba(128, 128, 128, 0.15);
		text-decoration: none;
		padding: 0.75rem 1.25rem;
		border-radius: 0.25rem;
		color: var(--text);
	}

	a:hover {
		background: rgba(128, 128, 128, 0.25);
	}
</style>
