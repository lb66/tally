<template>
  <Layout classPrefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" />
    <Types @update:value="onUpdateTypes" />
    <Notes @update:value="onUpdateNotes" filedName="备注" placeholder="在这里输入备注" />
    <Tags @update:value="onUpdateTags" />
    {{record}}
    {{recordList}}
  </Layout>
</template>

<script lang='ts'>
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: { Tags, Notes, Types, NumberPad },
  computed: {
    recordList() {
      return this.$store.state.recordList;
    },
  },
})
export default class Money extends Vue {
  tags = this.$store.commit("fetchTags");
  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };
  recordList = this.$store.commit("fetchRecords");
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  onUpdateTypes(value: string) {
    this.record.type = value;
  }
  onUpdateAmount(value: number) {
    this.record.amount = value;
  }
  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }
  saveRecord() {
    this.record.createAt = new Date();
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