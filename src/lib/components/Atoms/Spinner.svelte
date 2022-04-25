<script>
  import Refresh from '../Icons/refresh.svelte';
</script>

<span class="spinner"><Refresh /></span>

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
