<script>
  import Refresh from '../Icons/refresh.svelte';

  export let className = '';
</script>

<span class="spinner flex w-max h-max rounded-[100%] {className ?? ''}"><Refresh /></span>

<style>
  .spinner {
    animation: spin 1s infinite both;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
