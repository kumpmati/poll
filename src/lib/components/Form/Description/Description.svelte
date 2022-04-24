<script lang="ts">
  export let value: string;
</script>

<label class="flex flex-col">
  <!--
    <span class="font-extrabold text-neutral-300 dark:text-neutral-500">
    Description (optional)
  </span>
  -->
  <textarea
    bind:value
    class="bg-transparent text-lg p-1 placeholder-neutral-100 dark:placeholder-neutral-600"
    placeholder="Optional description (supports Markdown)"
  />
</label>
