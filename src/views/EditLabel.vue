<template>
  <Layout>
    <router-link :to="`/label`" class="back">
      <svg-icon name="left" />
    </router-link>
    <span>编辑</span>
    <Notes filedName="标签名" placeholder="请输入标签名" />
  </Layout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import tagModel from "@/models/tagModel";
import Notes from "@/components/Money/Notes.vue";
@Component({ components: { Notes } })
export default class EditLabel extends Vue {
  created() {
    const id = this.$route.params.id;
    tagModel.fetch();
    const tags = tagModel.data;
    const tag = tags.filter((t) => t.id === id)[0];
    if (tag) {
      console.log(tag);
    } else {
      this.$router.replace("/404");
    }
  }
}
</script>

<style lang="scss" scoped>
.back {
  display: inline-block;
  padding: 20px;
}
</style>