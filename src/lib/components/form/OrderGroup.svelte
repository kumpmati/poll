<script lang="ts">
  import type { Option as OptionType } from '$lib/types/poll';
  import { dndzone } from 'svelte-dnd-action';
  import type { DndEvent } from 'svelte-dnd-action';
  import { flip } from 'svelte/animate';

  export let options: OptionType[];
  export let selection: string[];

  let order: OptionType[] = options;

  // update selection when order changes
  $: selection = order.map((o) => o.id);

  const updateOrder = (e: CustomEvent<DndEvent>) => {
    order = e.detail.items as OptionType[];
  };
</script>

<ul
  use:dndzone={{ items: order, flipDurationMs: 200 }}
  on:consider={updateOrder}
  on:finalize={updateOrder}
>
  {#each order as { id, text }, index (id)}
    <li animate:flip={{ duration: 200 }}>
      <div class="order-number">
        {index + 1}
      </div>

      {#if text.startsWith('http')}
        <img src={text} alt="" />
      {:else}
        <p>{text}</p>
      {/if}
    </li>
  {/each}
</ul>

<style>
  ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    outline: none !important;
  }

  li {
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    border-radius: 0.25rem;
    overflow: hidden;
    background: rgba(128, 128, 128, 0.1);
    margin-bottom: 0.5rem;
    backdrop-filter: blur(15px);
  }

  img {
    width: 100%;
  }

  p {
    margin: 0;
    margin-left: 2ch;
  }

  .order-number {
    left: 0;
    height: 100%;
    min-height: 4rem;
    min-width: 4rem;
    font-size: 1.75rem;
    font-weight: 900;
    color: currentColor;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid rgba(0, 0, 0, 0.05);
    background: rgba(128, 128, 128, 0.1);
    font-family: 'Urbanist';

    transition: padding 200ms;
  }

  .order-number:hover {
    filter: brightness(0.95);
  }
</style>
