<script lang="ts">
  type Option = {
    label: string;
    value: any;
    title?: string; // optional explanation
  };

  export let options: Option[];
  export let current: any;
</script>

<div class="flex flex-row gap-2 justify-between items-start">
  <p class="font-extrabold text-lg"><slot /></p>

  <div class="flex gap-2">
    {#each options as option (option.value)}
      <label
        title={option.title}
        class="pt-1 pb-1 w-20 cursor-pointer text-center rounded-md {current === option.value
          ? 'bg-neutral-200 dark:bg-neutral-700 font-extrabold'
          : null}"
      >
        {option.label}
        <input class="hidden" type="radio" name="mode" value={option.value} bind:group={current} />
      </label>
    {/each}
  </div>
</div>
