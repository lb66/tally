<template>
<div>
  <layout>
    <div class="tags">
      <router-link class="tag" v-for="tag in tags" :key="tag.id" :to="`/label/edit/${tag.id}`">
        <span>{{tag.name}}</span>
        <svg-icon name="right" />
      </router-link>
    </div>
    <div class="button-wrapper">
      <Button type="primary" @click="createTag">
        新增标签
      </Button>
    </div>
  </layout>
</div>
</template>

<script>
import {
  Vue,
  Component
} from "vue-property-decorator";

@Component({
  computed: {
    tags() {
      return this.$store.state.tagData;
    },
  },
})
export default class Label extends Vue {
  tags = this.$store.commit("fetchTags");
  createTag() {
    setTimeout(() => {
      const name = window.prompt("请输入标签名");
      if (!name) {
        return;
      }
      this.$store.commit("createTag", name);
    }, 500);
  }
}
</script>

<style lang="scss" scoped>
.tags {
  font-size: 16px;
  padding: 8px 0;
}

.tag {
  display: flex;
  justify-content: space-between;
  min-height: 44px;
  align-items: center;
  border: 2px solid #d5dde0;

  svg {
    color: #666;
  }

  margin: 6px 16px;
  padding: 0 16px;
}

.button-wrapper {
  margin-top: 24px;
  display: grid;
  place-items: center;
}
</style>
