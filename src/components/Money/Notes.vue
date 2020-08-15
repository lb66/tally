<template>
  <div>
    <label class="notes" :class="`${classPrefix}-form` ">
      <span class="name">{{filedName}}</span>
      <template v-if="type==='date'">
        <input
          :type="type || 'text'"
          :placeholder="placeholder"
          :value="iso(value)"
          @input="$emit('update:value', $event.target.value)"
        />
      </template>
      <template v-else>
        <input
          :type="type || 'text'"
          :placeholder="placeholder"
          :value="value"
          @input="$emit('update:value', $event.target.value)"
        />
      </template>
    </label>
  </div>
</template> 

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
import dayjs from "dayjs";
@Component
export default class Notes extends Vue {
  @Prop({ default: "" }) value!: string;
  @Prop(String) filedName?: string;
  @Prop(String) placeholder?: string;
  @Prop(String) type?: string;
  @Prop(String) classPrefix?: string;

  iso(isoString: string) {
    return dayjs(isoString).format("YYYY-MM-DD");
  }
}
</script>

<style lang="scss" scoped>
.notes {
  font-size: 16px;
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