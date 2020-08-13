<template>
  <div class="layout-wrapper" :class="`${classPrefix}-wrapper`">
    <div class="content" :class="`${classPrefix}-content` ">
      <slot />
    </div>
    <Nav />
  </div>
</template>

<script>
export default {
  name: "Layout",
  props: ["classPrefix"],
};
</script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.content {
  flex-grow: 1;
  overflow: auto;
}
</style>