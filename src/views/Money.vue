<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
    <Types @update:value="onUpdateTypes" />
    <Notes @update:value="onUpdateNotes" filedName="备注" placeholder="在这里输入备注" />
    <Tags :data-source.sync="tags" @update:value="onUpdateTags" />
    <!-- {{recordList}} -->
  </Layout>
</template>

<script lang='ts'>
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import { Vue, Component, Watch } from "vue-property-decorator";
import recordModel from "@/models/recordModel";
import tagModel from "@/models/tagModel";

type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createAt?: Date;
};
@Component({ components: { Tags, Notes, Types, NumberPad } })
export default class Money extends Vue {
  tags = tagModel.fetch();
  record: Record = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };
  recordList: Record[] = recordModel.fetch();
  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  onUpdateTypes(value: string) {
    this.record.type = value;
  }
  onUpdateAmount(value: number) {
    this.record.amount = value;
    this.record.createAt = new Date();
  }
  saveRecord() {
    this.recordList.push(recordModel.clone(this.record));
  }
  @Watch("recordList")
  onRecordListChanged() {
    recordModel.save(this.recordList);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>