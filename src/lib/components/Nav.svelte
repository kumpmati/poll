<script lang="ts">
	import { user } from '$lib/stores/user';
</script>

<nav>
	{#if $user}
		<p>Signed in as {$user.alias}</p>
	{:else}
		<a href="/auth"> Sign In</a>
	{/if}
</nav>
