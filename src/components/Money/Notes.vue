<template>
  <div>
    <label class="notes">
      <span class="name">{{this.filedName}}</span>
      <input
        type="text"
        :placeholder="placeholder"
        :value="value"
        @input="$emit('update:value', $event.target.value)"
      />
    </label>
  </div>
</template> 

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class Notes extends Vue {
  @Prop({ default: "" }) value!: string;
  @Prop(String) filedName!: string;
  @Prop(String) placeholder?: string;
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