<template>
<Layout classPrefix="layout" :style="{height:h+'px'}">
  <NumberPad :value.sync="record.amount" @submit="saveRecord" />
  <Tabs :dataSource="typeList" :value.sync="record.type" />
  <Notes :value.sync="record.notes" filedName="备注" placeholder="你要默默的记账，然后惊艳所有人" />
  <Tags :value.sync="record.tags" />
  <Notes :value.sync="record.createAt" type="date" classPrefix="date" />
  <img :src="QR" class="qr" @click="hidden(isShow)" v-show="isShow" />
</Layout>
</template>

<script lang="ts">
import NumberPad from "@/components/Money/NumberPad.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import Tabs from "@/components/Tabs.vue";
import {
  Vue,
  Component
} from "vue-property-decorator";

@Component({
  components: {
    Tags,
    Notes,
    NumberPad,
    Tabs
  },
  computed: {
    recordList() {
      return this.$store.state.recordList;
    },
  },
})
export default class Money extends Vue {
  h = document.body.clientHeight;
  typeList = [{
      text: "支出",
      value: "-"
    },
    {
      text: "收入",
      value: "+"
    },
  ];
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
    createAt: new Date().toISOString(),
  };
  created() {
    this.$store.commit("fetchTags");
    this.$store.commit("fetchRecords");
  }
  saveRecord() {
    this.record.createAt = this.record.createAt || new Date().toISOString();
    this.$store.commit("createRecord", this.record);
    this.record.notes = "";
    window.alert("添加成功");
  }

  QR = require("@/assets/QRcode.png");
  isShow = true;
  hidden(x: boolean) {
    if (x === true) {
      this.isShow = false;
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
  margin: 0 0 55px 0;
}

::v-deep .date-form {
  background: #a6b8bd;

  .name {
    flex-grow: 1;
    font-weight: bold;
  }

  input {
    height: 44px;
  }
}

.qr {
  position: fixed;
  width: 180px;
  top: 7%;
  right: 5%;
}

@media screen and (max-width: 480px) {
  .qr {
    display: none;
  }
}
</style>
