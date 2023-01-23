<script lang="ts">
	import { user } from '$lib/stores/user';

	let alias = '';
	let pass = '';
</script>

<a href="/">Back</a>

<h1>Authenticate</h1>

<form on:submit|preventDefault={() => null}>
	<input type="text" bind:value={alias} placeholder="alias" />
	<input type="password" bind:value={pass} placeholder="passphrase" />

	<input type="submit" on:click={() => user.signUp(alias, pass)} value="Sign Up" />
	<input type="submit" on:click={() => user.signIn(alias, pass)} value="Sign In" />
	<input type="submit" on:click={() => user.signOut()} value="Sign Out" />
</form>
