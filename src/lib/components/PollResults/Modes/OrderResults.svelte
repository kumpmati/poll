<script lang="ts">
  import type { Poll, Results } from '$lib/types/poll';
  import { calculateOrderStats } from '$lib/utils/stats';
  import { crossfade } from 'svelte/transition';
  import { getOrderModeSortedOptions } from '$lib/utils/sort';
  import { flip } from 'svelte/animate';

  export let poll: Poll;
  export let results: Results;

  $: stats = calculateOrderStats(poll, results);

  const [send, receive] = crossfade({
    duration: (d) => Math.sqrt(d * 200)
  });
</script>

<ul>
  {#each getOrderModeSortedOptions(poll, stats) as { id, text }, index (id)}
    <li
      in:receive|local={{ key: id }}
      out:send|local={{ key: id }}
      animate:flip={{ duration: 200 }}
    >
      <div class="order-number">
        {index + 1}
      </div>

      {#if text.startsWith('http')}
        <img class="image" src={text} alt="" />
      {:else}
        <p class="text">
          {text}
        </p>
      {/if}

      <div class="points">
        <b>{stats[id]}</b> points
      </div>
    </li>
  {/each}
</ul>

<style>
  ul {
    list-style: none;
    color: var(--text);
    padding: 0;

    display: grid;
    grid-template-columns: 1fr;
  }

  .image {
    width: 100%;
    border-radius: 0.25rem;
    margin-left: 1ch;
  }

  .text {
    font-size: 1.125rem;
    margin: 0;
    margin-left: 2ch;
  }

  img {
    width: 100%;
  }

  p {
    margin: 0;
    margin-left: 2ch;
  }

  li {
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    border-radius: 0.25rem;
    overflow: hidden;
    margin-bottom: 1rem;
    color: var(--text-subtle);

    transition: font-size 200ms, min-height 200ms, min-width 200ms, color 200ms;
  }

  li:nth-of-type(1) .text {
    font-size: 1.5rem;
  }

  li:nth-of-type(1) .order-number {
    font-size: 3rem;
    background: var(--blue);
    color: #fff;
    min-width: 5rem;
    height: 5rem;
  }

  .order-number {
    left: 0;
    min-width: 4rem;
    height: 4rem;
    margin-bottom: auto;
    font-size: 1.75rem;
    font-weight: 900;
    color: currentColor;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.25rem;
    background: rgba(128, 128, 128, 0.25);
    color: var(--text);
    backdrop-filter: blur(15px);
    font-family: 'Urbanist';

    transition: padding 200ms;
  }

  .points {
    margin-left: 2ch;
    color: var(--text-subtle);
  }

  .points b {
    color: var(--text);
  }

  @media screen and (max-width: 700px) {
    .order-number {
      min-width: 3rem;
      height: 3rem;
    }

    .text {
      margin-left: 1ch;
    }

    li:nth-of-type(1) .text {
      font-size: 1.25rem;
    }

    li:nth-of-type(1) .order-number {
      min-width: 4rem;
      height: 4rem;
      font-size: 2.5rem;
    }

    .points {
      display: none;
    }
  }
</style>
