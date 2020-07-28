<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      <svg-icon name="money" />记账
    </router-link>
    <router-link to="/label" class="item" active-class="selected">
      <svg-icon name="label" />标签
    </router-link>
    <router-link to="/statistic" class="item" active-class="selected">
      <svg-icon name="statistic" />统计
    </router-link>
  </nav>
</template>

<script>
export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
@import "../assets/style/helper.scss";
nav {
  @extend %outerShadow;
  display: flex;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  > .item {
    padding: 4px 0;
    width: 33.3333%;
    display: flex;
    align-items: center;
    flex-direction: column;
    .svgClass {
      width: 30px;
      height: 30px;
    }
  }
  > .selected {
    color: $color-highlight;
  }
}
</style>