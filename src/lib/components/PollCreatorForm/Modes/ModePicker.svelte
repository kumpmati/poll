<script lang="ts">
  import MultipleChoiceSettings from './ChoiceSettings.svelte';
  import PriorityOrderSettings from './OrderSettings.svelte';

  let selectedMode: 'choice' | 'order' = 'choice';
</script>

<div class="container">
  <div>
    <h3>Mode</h3>
    <div class="modePicker">
      <label>
        <input type="radio" name="mode" value="choice" bind:group={selectedMode} />
        Choice
      </label>
      <label>
        <input type="radio" name="mode" value="order" bind:group={selectedMode} />
        Order
      </label>
    </div>
  </div>

  <div class="modeSettings">
    <h3>Mode settings</h3>

    <!-- Forward on:changed events from child components -->

    {#if selectedMode === 'choice'}
      <MultipleChoiceSettings on:changed />
    {:else if selectedMode === 'order'}
      <PriorityOrderSettings on:changed />
    {/if}
  </div>
</div>

<style>
  .container {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    padding: 2rem 0;
  }

  @media screen and (max-width: 700px) {
    .container {
      grid-template-columns: 1fr;
    }
  }

  h3 {
    margin: 0;
  }

  .modePicker {
    display: flex;
    flex-direction: column;
  }

  label {
    font-size: 1.125rem;
    color: var(--text-subtle);
  }

  label > input {
    width: 1rem;
    height: 1rem;
  }

  .modeSettings h3 {
    margin-bottom: 1rem;
  }
</style>
