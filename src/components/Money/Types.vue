// 此文件已改为Tabs.vue,不使用仅作参考
<template>
  <div>
    <ul class="types">
      <li :class="type==='-' ? 'selected':null" @click="selectType('-')">支出</li>
      <li :class="{selected: type==='+'}" @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Watch } from "vue-property-decorator";
@Component
export default class Types extends Vue {
  type = "-"; //默认为支出
  selectType(type: string) {
    this.type = type;
  }
  @Watch("type")
  onTypeChanged(value: string) {
    this.$emit("update:value", value);
  }
}
</script>

<style lang="scss" scoped>
</style>
