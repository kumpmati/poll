<script lang="ts">
  export let value: string;
</script>

<label class="flex flex-col">
  <span class="font-extrabold text-neutral-300 dark:text-neutral-500">Title</span>
  <!-- svelte-ignore a11y-autofocus -->
  <input
    autofocus
    bind:value
    required
    autocomplete={null}
    type="text"
    class="text-4xl p-2 pl-1 pr-1 font-extrabold font-main bg-transparent placeholder-neutral-100 dark:placeholder-neutral-600"
    placeholder="Your title here"
  />
</label>
