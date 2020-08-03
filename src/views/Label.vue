import { Vue } from 'vue-property-decorator';
<template>
  <div>
    <layout>
      <div class="tags">
        <router-link class="tag" v-for="tag in tags" :key="tag.id" :to="`/label/edit/${tag.id}`">
          <span>{{tag.name}}</span>
          <svg-icon name="right" />
        </router-link>
      </div>
      <div class="createTag-wrapper">
        <button class="createTag" @click="createTag">
          新增标签
          <span></span>
        </button>
      </div>
    </layout>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import tagModel from "@/models/tagModel";

tagModel.fetch();
@Component
export default class Label extends Vue {
  tags = tagModel.data;
  createTag() {
    setTimeout(() => {
      const name = window.prompt("请输入标签名");
      if (name) {
        const message = tagModel.create(name);
        if (message === "duplicated") {
          window.alert("该标签已存在");
        }
      } else {
        return;
      }
    }, 500);
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding: 8px 0;
}
.tag {
  display: flex;
  justify-content: space-between;
  min-height: 44px;
  align-items: center;
  border: 2px solid #ecf0f1;
  svg {
    color: #666;
  }
  margin: 6px 16px;
  padding: 0 16px;
}
.createTag {
  &-wrapper {
    padding: 20px;
    display: grid;
    place-items: center;
  }
  border: none;
  display: block;
  position: relative;
  padding: 0.6em 1.2em;
  font-size: 18px;
  background: transparent;
  cursor: pointer;
  color: royalblue;
  overflow: hidden;
  span {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: -1;
    border: 5px solid royalblue;
  }
  span::before {
    content: "";
    position: absolute;
    width: 8%;
    height: 500%;
    background: #f5f5f5;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-60deg);
    transition: all 1s;
  }
}
.createTag:focus span::before,
.button:focus span::before {
  transform: translate(-50%, -50%) rotate(-90deg);
  width: 100%;
  background: royalblue;
}
.createTag:focus,
.button:focus {
  color: #f5f5f5;
}
</style>