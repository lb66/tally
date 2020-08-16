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
@Component({
  computed: {
    tagList() {
      return this.$store.state.tagData;
    },
  },
})
export default class Tags extends Vue {
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
    this.$store.commit("createTag", name);
  }
  created() {
    this.$store.commit("fetchTags");
    this.select(this.$store.state.tagData[0]);
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 18px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      cursor: pointer;
      background: #e0e7e8;
      $h: 36px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      &.selected {
        background: #ff6600;
        color: white;
      }
    }
  }
  > .new {
    padding-top: 16px;
    button {
      cursor: pointer;
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>