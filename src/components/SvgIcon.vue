<template>
  <svg class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>
 
<script>
export default {
  name: "SvgIcon",
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.name}`;
    },
  },
};
</script>
 
<style lang="scss" scoped>
.svgClass {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
