<script>
  import Button from '$lib/components/Button/Button.svelte';
</script>

<svelte:head>
  <title>Not Found</title>
</svelte:head>

<div class="container">
  <h1>What, not found? 😳</h1>
  <p>You probably have an invalid link or the poll doesn't exist anymore.</p>

  <div class="button">
    <Button priority="secondary" link="/">Home</Button>
  </div>
</div>

<style>
  .container {
    position: relative;
    top: 30vh;
    display: block;
    text-align: center;
  }
  h1 {
    margin: 0;
    font-size: 4rem;
    font-weight: 900;
    font-family: var(--font-family-heading);
  }

  p {
    color: var(--text-subtle);
  }

  .button {
    margin-top: 4rem;
    display: flex;
    justify-content: center;
  }
</style>
