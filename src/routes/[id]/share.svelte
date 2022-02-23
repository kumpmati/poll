<script lang="ts">
  import { page } from '$app/stores';

  import Button from '$lib/components/Button/Button.svelte';
  import QrCode from '$lib/components/QrCode/QrCode.svelte';

  let link = `https://poll.matsku.dev/${$page.params.id}`;
</script>

<h1>Share</h1>

<div class="qrCode">
  <QrCode codeValue={link} squareSize={250} />
</div>

<input class="text-input" readonly type="text" value={link} />

<div class="controls">
  <Button priority="secondary" link="/{$page.params.id}">Go to poll</Button>
</div>

<style>
  h1 {
    font-family: var(--font-family-heading);
    margin-top: 8rem;
    font-size: 4rem;
    font-weight: 900;
    text-align: center;
  }

  .text-input {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    font-family: var(--font-family-heading);
    font-weight: 500;
    width: fit-content;
    min-width: 26ch;
    text-align: center;
    padding: 0.5rem;
    font-size: 1.25rem;
  }

  .controls {
    display: flex;
    margin-top: 3rem;
    justify-content: center;
  }

  .qrCode {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    width: 100%;
  }

  @media screen and (max-width: 700px) {
    .text-input {
      min-width: 23ch;
      font-size: 1.125rem;
    }
  }
</style>
