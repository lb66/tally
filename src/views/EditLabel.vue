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
import Notes from "@/components/Money/Notes.vue";
import Button from "@/components/Button.vue";
@Component({
  components: { Notes, Button },
  computed: {
    tag() {
      return this.$store.state.currentTag;
    },
  },
})
export default class EditLabel extends Vue {
  tag?: Tag = undefined;
  created() {
    this.$store.commit("fetchTags");
    const id = this.$route.params.id;
    this.$store.commit("selectCurrentTag", id);
    if (!this.tag) {
      this.$router.replace("/404");
    }
  }
  update(name: string) {
    if (this.tag) {
      this.$store.commit("updateTag", { id: this.tag.id, name });
    }
  }
  remove() {
    if (this.tag) {
      this.$store.commit("removeTag", this.tag.id);
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