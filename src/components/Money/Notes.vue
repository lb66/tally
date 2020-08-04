<template>
  <div>
    <label class="notes">
      <span class="name">{{this.filedName}}</span>
      <input type="text" :placeholder="this.placeholder" v-model="value" />
    </label>
  </div>
</template> 

<script lang='ts'>
import { Vue, Component, Watch, Prop } from "vue-property-decorator";
@Component
export default class Notes extends Vue {
  value = "";
  @Prop(String) filedName!: string;
  @Prop(String) placeholder?: string;
  @Watch("note")
  onNoteChanged(val: string) {
    this.$emit("update:value", val);
  }
}
</script>

<style lang="scss" scoped>
.notes {
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    height: 64px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>