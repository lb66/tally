<template>
  <button class="buttons">
    <slot />
  </button>
</template>

<script lang="ts">
</script>

<style lang='scss' scoped>
.buttons {
  border: none;
  display: block;
  position: relative;
  padding: 0.6em 1.2em;
  font-size: 18px;
  background: transparent;
  cursor: pointer;
  color: royalblue;
  overflow: hidden;
  span {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: -1;
    border: 5px solid royalblue;
  }
  span::before {
    content: "";
    position: absolute;
    width: 8%;
    height: 500%;
    background: #f5f5f5;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-60deg);
    transition: all 1s;
  }
}
.buttons:focus span::before,
.button:focus span::before {
  transform: translate(-50%, -50%) rotate(-90deg);
  width: 100%;
  background: royalblue;
}
.buttons:focus,
.button:focus {
  color: #f5f5f5;
}
</style>