<script lang="ts">
  export let className = '';

  let hovering = false;

  function enter() {
    hovering = true;
  }

  function leave() {
    hovering = false;
  }
</script>

<div class={className} on:mouseenter={enter} on:mouseleave={leave}>
  <slot {hovering} />
</div>
