<!--
  borrowed from https://svelte.dev/repl/72d3ca877047468db8bb3a68f25a8b92?version=3.14.1
-->
<script lang="ts">
  import { onMount } from 'svelte';
  import Spinner from '../Atoms/Spinner.svelte';

  export let value: string;
  export let size: number;
  export let className = '';

  let qrcode;
  let loaded = false;

  onMount(() => {
    let script = document.createElement('script');
    script.src = 'https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js';
    document.head.append(script);

    script.onload = function () {
      qrcode = new window.QRCode('qrcode', {
        text: value,
        width: size,
        height: size,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: window.QRCode.CorrectLevel.H
      });
      loaded = true;
    };
  });
</script>

<div
  id="qrcode"
  class="rounded-md p-2 bg-white aspect-square flex items-center justify-center {className ?? ''}"
>
  {#if !loaded}
    <Spinner className="text-neutral-600" />
  {/if}
</div>

<style>
  #qrcode :global(img) {
    width: 100%;
    height: 100%;
  }
</style>
