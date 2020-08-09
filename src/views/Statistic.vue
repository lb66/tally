<template>
  <div>
    <Layout>
      <Tabs classPrefix="type" :dataSource="typeList" :value.sync="type" />
      <Tabs classPrefix="time" :dataSource="timeList" :value.sync="time" />
      {{type}}{{time}}
    </Layout>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  type = "-";
  time = "day";
  typeList = [
    { text: "支出", value: "-" },
    { text: "收入", value: "+" },
  ];
  timeList = [
    { text: "天", value: "day" },
    { text: "周", value: "week" },
    { text: "月", value: "mouth" },
  ];
}
</script>

<style lang="scss" scoped>
::v-deep .type-item {
  background: white;
  &.selected {
    background: #b1c2c6;
  }
  &::after {
    display: none;
  }
}
</style>