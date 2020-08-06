<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <li
        v-for="tag in tagList"
        :key="tag.id"
        @click="select(tag)"
        :class="selectedTags.indexOf(tag)>=0 && 'selected'"
      >{{tag.name}}</li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import tagModel from "@/models/tagModel";
@Component
export default class Tags extends Vue {
  tagList = tagModel.fetch();
  selectedTags: string[] = [];
  select(tag: string) {
    if (this.selectedTags.length >= 1) {
      this.selectedTags.splice(0, 1);
    }
    this.selectedTags.push(tag);
    this.$emit("update:value", this.selectedTags);
  }
  create() {
    const name = window.prompt("请输入标签名");
    if (!name) {
      return;
    }
    tagModel.create(name);
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      background: #e0e7e8;
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      &.selected {
        background: darken(#e0e7e8, 30%);
        color: white;
      }
    }
  }
  > .new {
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>