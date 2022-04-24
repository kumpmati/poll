<script lang="ts">
  import { page } from '$app/stores';

  const link = `https://poll.matsku.dev/${$page.params.id}`;
</script>

<div class="relative flex flex-col items-center top-[50vh] -translate-y-1/2">
  <h1 class="font-extrabold text-5xl sm:text-6xl mb-4">Share</h1>

  <img
    class="w-3/4 max-w-xs rounded-md"
    src="https://chart.googleapis.com/chart?cht=qr&chs=256x256&chld=L|1&chl={link}"
    width={128}
    height={128}
    alt="QR code"
  />

  <a
    href="/{$page.params.id}"
    class="px-6 py-3 font-extrabold text-md mt-4 rounded-md dark:bg-neutral-700 hover:dark:bg-neutral-600"
    >Go to poll</a
  >
</div>
