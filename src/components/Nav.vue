<template>
  <div class="nav">
    <router-link to="/money">
      <svg-icon name="money"></svg-icon>记账
    </router-link>|
    <router-link to="/label">
      <svg-icon name="label"></svg-icon>标签
    </router-link>|
    <router-link to="/statistic">
      <svg-icon name="statistic"></svg-icon>统计
    </router-link>
  </div>
</template>

<script>
// const importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
//   requireContext.key().foreach(requireContext);
// try {
//   importAll(require.context("../assets/icons", true, /\.svg$/));
// } catch (error) {
//   console.log(error);
// }

export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
.nav {
  border: 1px solid red;
}
#icon-money {
  border: 1px solid black;
}
</style>