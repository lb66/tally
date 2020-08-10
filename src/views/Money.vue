<template>
  <Layout classPrefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" />
    <Tabs :dataSource="typeList" :value.sync="record.type" />
    <Notes @update:value="onUpdateNotes" filedName="备注" placeholder="在这里输入备注" />
    <Tags :value.sync="record.tags" />
    {{record}}
  </Layout>
</template>

<script lang='ts'>
import NumberPad from "@/components/Money/NumberPad.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import Tabs from "@/components/Tabs.vue";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: { Tags, Notes, NumberPad, Tabs },
  computed: {
    recordList() {
      return this.$store.state.recordList;
    },
  },
})
export default class Money extends Vue {
  typeList = [
    { text: "支出", value: "-" },
    { text: "收入", value: "+" },
  ];
  tags = this.$store.commit("fetchTags");
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
    createAt: "",
  };
  recordList = this.$store.commit("fetchRecords");
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    this.record.createAt = new Date().toISOString();
    this.$store.commit("createRecord", this.record);
  }
}
</script>

<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>