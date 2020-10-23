<template>
<div>
  <Layout>
    <Tabs classPrefix="type" :dataSource="typeList" :value.sync="type" />
    <Button size="large" type="default" @click="toggle">切换日 / 月</Button>
    <div class="chart-wrapper" ref="chartWrapper" v-if="dayOrMonth">
      <Chart class="chart" :options="chartOptions(keyValueList)" />
    </div>
    <div v-else>
      <Chart class="chart2" :options="chartOptions(monthKeyValueList)" />
    </div>
    <div class="list">
      <ol v-if="groupList.length > 0">
        <li v-for="(group, index) in groupList" :key="index">
          <h3 class="title">
            {{ simplify(group.title) }}
            <span>￥{{ group.total }}</span>
          </h3>
          <ol>
            <li v-for="item in group.items" :key="item.id" class="record">
              <span>{{ item.tags[0].name }}</span>
              <span class="notes">{{ item.notes }}</span>
              <span>￥{{ item.amount }}</span>
              <Button style="margin-left: 10px" size="small" type="danger" plain @click="remove(item)">删除</Button>
            </li>
          </ol>
        </li>
      </ol>
      <div v-else class="noRecord">无记录</div>
    </div>
  </Layout>
</div>
</template>

<script lang="ts">
import {
  Vue,
  Component
} from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import dayjs from "dayjs";
import clone from "@/lib/clone";
import Chart from "@/components/Chart.vue";
import _ from "lodash";

@Component({
  components: {
    Tabs,
    Chart,
  },
})
export default class Statistics extends Vue {
  dayOrMonth = true
  type = "-";
  time = "day";
  typeList = [{
      text: "支出",
      value: "-",
    },
    {
      text: "收入",
      value: "+",
    },
  ];
  toggle() {
    this.dayOrMonth = !this.dayOrMonth
  }
  remove(cur: RecordItem) {
    const list = (this.$store.state as RootState).recordList;
    console.log(cur.createAt, list);
    for (let i = 0; i < list.length; i++) {
      if (list[i].createAt === cur.createAt && list[i].amount === cur.amount) {
        this.$store.commit("removeRecord", i);
        break;
      }
    }
  }
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
    type After = {
      title: string;
      total? : number;
      items: RecordItem[];
    } [];
    const afterList: After = [{
      title: dayjs(beforeList[0].createAt).format("YYYY-MM-DD"),
      items: [beforeList[0]],
    }, ];
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

  get keyValueList() {
    const today = new Date();
    //按日查看
    const array = [];
    for (let i = 0; i <= 29; i++) {
      const dateString = dayjs(today).subtract(i, "day").format("YYYY-MM-DD");
      const found = _.find(this.groupList, {
        title: dateString,
      });
      array.push({
        key: dateString,
        value: found ? found.total : 0,
      });
    }
    array.sort((a, b) => {
      if (a.key > b.key) {
        return 1;
      } else {
        return -1;
      }
    });
    return array;
  }
  get monthKeyValueList() {
    const today = new Date();
    //按月查看
    const array2 = [];
    for (let i = 0; i < 12; i++) {
      const monthString = dayjs(today).subtract(i, "month").format("YYYY-MM");
      let monthTotal = 0;
      for (let j = 0; j <= 30; j++) {
        const dayFound = _.find(this.groupList, {
          title: monthString + "-" + j,
        });
        if (dayFound && dayFound.total) {
          monthTotal += dayFound.total;
        }
      }
      array2.push({
        key: monthString,
        value: monthTotal,
      });
    }
    array2.sort((a, b) => {
      if (a.key > b.key) {
        return 1;
      } else {
        return -1;
      }
    });
    // console.log(array2)
    return array2;
  }

  chartOptions(list: keyValueList) {
    // console.log(list)
    const keys = list.map((item) => item.key);
    const values = list.map((item) => item.value);
    return {
      grid: {
        left: 0,
        right: 0,
        top: 30,
        bottom: 30,
      },
      xAxis: {
        type: "category",
        data: keys,
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          lineStyle: {
            color: "#666",
          },
        },
        axisLabel: {
          formatter: function (value: string) {
            return value.substr(5);
          },
        },
      },
      yAxis: {
        type: "value",
        show: false,
      },
      series: [{
        // symbol: "circle",
        symbolSize: 10,
        itemStyle: {
          borderWidth: 1,
          color: "#45657b",
        },
        data: values,
        type: "line",
      }, ],
      tooltip: {
        padding: [2, 5],
        show: true,
        triggerOn: "click",
        position: "top",
        formatter: "{c}",
      },
    };
  }
  mounted() {
    const div = this.$refs.chartWrapper as HTMLDivElement;
    div.scrollLeft = div.scrollWidth;
    console.log(div.scrollWidth)
  }
}
</script>

<style lang="scss" scoped>
.list {
  margin-bottom: 55px;

  ::-webkit-scrollbar {
    display: none;
  }
}

::v-deep .type-item {
  color: #f2f5f5;
  background: #b1c2c6;

  &.selected {
    background: #f2f5f5;
    color: black;
    font-size: 28px;
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
  align-items: center;
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

.noRecord {
  // display: inline-block;
  padding: 20px;
  text-align: center;
}

.chart {
  height: 150px;
  width: 430%;

  &-wrapper {
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.chart2 {
  height: 150px;
  width: 100%;
}

.switch {
  margin: 10px 10px 0 10px;
}
</style>
