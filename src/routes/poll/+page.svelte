<script lang="ts">
	import { getPolls } from '$lib/gun';

	const polls = getPolls();
</script>

<ul>
	{#each Object.entries($polls) as [key, poll] (key)}
		<li>
			<a href="/poll/{poll.id}">
				<h2>
					{poll.title}
				</h2>
				<p>{poll.description}</p>
			</a>
		</li>
	{/each}
</ul>

<style lang>
	ul {
		padding: 0;
		list-style: none;
	}

	a {
		display: flex;
		flex-direction: column;
		text-decoration: none;
		border: 1px solid red;
	}

	h2,
	p {
		margin: 0;
	}
</style>
