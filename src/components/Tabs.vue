<template>
  <div>
    <ul class="tabs">
      <li
        class="tabs-item"
        v-for="item in dataSource"
        :key="item.value"
        @click="select(item)"
        :class="{[classPrefix+'-item']: classPrefix,selected:item.value===value}"
      >{{item.text}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class Tabs extends Vue {
  @Prop({ required: true, type: Array }) dataSource!: {
    text: string;
    value: string;
  }[];
  @Prop(String) classPrefix?: string;
  @Prop(String) value!: string;
  select(item: { text: string; value: string }) {
    this.$emit("update:value", item.value);
  }
}
</script>

<style lang='scss' scoped>
.tabs {
  background: #b1c2c6;
  display: flex;
  text-align: center;
  font-size: 24px;
  &-item {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: gray;
    }
  }
}
</style>