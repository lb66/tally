<template>
  <div>
    <Layout>
      <div class="tabs">
        <Tabs classPrefix="type" :dataSource="typeList" :value.sync="type" />
        <Tabs classPrefix="time" :dataSource="timeList" :value.sync="time" />
        {{type}}{{time}}
      </div>

      <div class="list">
        <ol>
          <li v-for="(group,index) in result" :key="index">
            <h3 class="title">{{group.title}}</h3>
            <ol>
              <li v-for="item in group.items" :key="item.id" class="record">
                <span>{{tagString(item.tags)}}</span>
                <span class="notes">{{item.notes}}</span>
                <span>￥{{item.amount}}</span>
              </li>
            </ol>
          </li>
        </ol>
      </div>
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
  created() {
    this.$store.commit("fetchRecords");
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  get result() {
    type HashTableValue = { title: string; items: RecordItem[] };
    const hashTable: { [key: string]: HashTableValue } = {};
    for (let i = 0; i < this.recordList.length; i++) {
      const date = this.recordList[i].createAt.split("T")[0];
      hashTable[date] = hashTable[date] || { title: date, items: [] };
      hashTable[date].items.push(this.recordList[i]);
    }
    return hashTable;
  }
  tagString(tags: Tag[]) {
    return tags.length === 0 ? "无" : tags[0].name;
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  position: fixed;
  width: 100%;
}
.list {
  margin-top: 112px;
}
::v-deep .type-item {
  background: white;
  &.selected {
    background: #b1c2c6;
    color: royalblue;
  }
  &::after {
    display: none;
  }
}
::v-deep .time-item {
  height: 48px;
  &.selected {
    color: royalblue;
  }
}
%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title {
  @extend %item;
}
.record {
  background: white;
  @extend %item;
}
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
</style>