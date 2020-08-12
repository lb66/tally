<template>
  <div>
    <Layout>
      <div class="tabs">
        <Tabs classPrefix="type" :dataSource="typeList" :value.sync="type" />
      </div>

      <div class="list">
        <ol>
          <li v-for="(group,index) in groupList" :key="index">
            <h3 class="title">
              {{simplify(group.title)}}
              <span>￥{{group.total}}</span>
            </h3>
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
import dayjs from "dayjs";
import clone from "@/lib/clone";
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
  created() {
    this.$store.commit("fetchRecords");
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  get groupList() {
    const beforeList = clone(this.recordList)
      .filter((x) => x.type === this.type)
      .sort((a, b) => dayjs(b.createAt).unix() - dayjs(a.createAt).unix());
    if (beforeList.length === 0) {
      return [];
    }
    type After = { title: string; total?: number; items: RecordItem[] }[];
    const afterList: After = [
      {
        title: dayjs(beforeList[0].createAt).format("YYYY-MM-DD"),
        items: [beforeList[0]],
      },
    ];
    for (let i = 1; i < beforeList.length; i++) {
      const last = afterList[afterList.length - 1];
      if (dayjs(last.title).isSame(beforeList[i].createAt, "day")) {
        last.items.push(beforeList[i]);
      } else {
        afterList.push({
          title: dayjs(beforeList[i].createAt).format("YYYY-MM-DD"),
          items: [beforeList[i]],
        });
      }
    }
    afterList.map((group) => {
      group.total = group.items.reduce((sum, item) => {
        return sum + item.amount;
      }, 0);
    });
    return afterList;
  }
  tagString(tags: Tag[]) {
    return tags.length === 0 ? "无" : tags[0].name;
  }
  simplify(string: string) {
    const now = dayjs();
    const day = dayjs(string);
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("M月D日");
    } else {
      return day.format("YY年M月D日");
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  position: fixed;
  width: 100%;
}
.list {
  margin-top: 64px;
  ::-webkit-scrollbar {
    display: none;
  }
}
::v-deep .type-item {
  background: #b1c2c6;
  &.selected {
    background: #f2f5f5;
    color: royalblue;
  }
  &::after {
    display: none;
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
  background: #d5dde0;
  @extend %item;
}
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
</style>