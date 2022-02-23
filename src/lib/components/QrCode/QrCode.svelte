<script>
  import { onMount } from 'svelte';

  export let codeValue;
  export let squareSize;

  let qrcode;

  onMount(() => {
    let script = document.createElement('script');
    script.src = 'https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js';
    document.head.append(script);

    script.onload = function () {
      qrcode = new window.QRCode('qrCode', {
        text: codeValue,
        width: squareSize,
        height: squareSize,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: window.QRCode.CorrectLevel.H
      });
    };
  });
</script>

<div id="qrCode" />

<style>
  #qrCode {
    padding: 0.25rem;
    background: #fff;
    border-radius: 0.25rem;
    width: fit-content;
  }
</style>
