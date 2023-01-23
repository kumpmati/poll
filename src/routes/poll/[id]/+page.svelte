<script lang="ts">
	import { page } from '$app/stores';
	import { getPoll, gun } from '$lib/gun';

	const data = getPoll($page.params.id);

	let title = $data?.title ?? '';

	const handleSubmit = async () => {
		if ($data) gun.get($data.id).put({ title });
	};
</script>

<h1>{$data?.title}</h1>
<p>{$data?.description}</p>

<form on:submit|preventDefault={handleSubmit}>
	<input type="text" bind:value={title} placeholder="title" />
	<input type="submit" />
</form>
