<script lang="ts">
  import { page } from '$app/stores';

  const link = `https://poll.matsku.dev/${$page.params.id}`;
</script>

<div class="relative flex flex-col items-center top-[50vh] -translate-y-1/2">
  <h1 class="font-extrabold text-5xl sm:text-6xl mb-4">Share</h1>

  <img
    class="w-3/4 sm:w-1/2 max-w-xs rounded-md bg-white"
    src="https://chart.googleapis.com/chart?cht=qr&chs=256x256&chld=L|1&chl={link}"
    width={128}
    height={128}
    alt="QR code"
  />

  <input
    type="text"
    value={link}
    readonly
    class="px-4 py-2 rounded-md mt-4 bg-transparent w-full max-w-xs text-center"
    on:focus={(e) => e.currentTarget.select()}
  />

  <a
    href="/{$page.params.id}"
    class="px-6 py-3 font-extrabold text-md mt-6 rounded-md bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-700 hover:dark:bg-neutral-600"
  >
    Go to poll
  </a>
</div>
