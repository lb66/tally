<template>
  <Layout>
    <div class="navBar">
      <router-link :to="`/label`" class="back">
        <svg-icon name="left" />
      </router-link>
      <span>编辑标签</span>
      <span class="right"></span>
    </div>
    <div class="note-wrapper">
      <Notes :value="tag.name" filedName="标签名" placeholder="请输入标签名" @update:value="update" />
    </div>
    <div class="button-wrapper">
      <Button @click="remove">
        删除标签
        <span />
      </Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import tagModel from "@/models/tagModel";
import Notes from "@/components/Money/Notes.vue";
import Button from "@/components/Button.vue";
type Tag = {
  id: string;
  name: string;
};
@Component({ components: { Notes, Button } })
export default class EditLabel extends Vue {
  tag?: Tag = undefined;
  created() {
    const id = this.$route.params.id;
    const tags = tagModel.fetch();
    const tag = tags.filter((t: Tag) => t.id === id)[0];
    if (tag) {
      this.tag = tag;
    } else {
      this.$router.replace("/404");
    }
  }
  update(name: string) {
    if (this.tag) {
      tagModel.update(this.tag.id, name);
    }
  }
  remove() {
    if (this.tag) {
      tagModel.remove(this.tag.id);
      if (tagModel.remove(this.tag.id)) {
        this.$router.back();
      } else {
        window.alert("删除失败");
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > .back {
    display: inline-block;
    padding: 16px;
    width: 16px;
  }
  > .right {
    display: inline-block;
    padding: 16px;
    width: 16px;
  }
}
.note-wrapper {
  background: white;
  margin-top: 8px;
}
.button-wrapper {
  padding: 24px;
  display: grid;
  place-items: center;
}
</style>