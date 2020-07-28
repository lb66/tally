<template>
  <Layout class-prefix="layout">
    <NumberPad />
    <Types />
    <Notes />
    <Tags />
  </Layout>
</template>

<script lang="ts">
import NumberPad from "@/components/Money/NumberPad";
import Types from "@/components/Money/Types";
import Notes from "@/components/Money/Notes";
import Tags from "@/components/Money/Tags";
export default {
  name: "Money",
  components: { NumberPad, Types, Notes, Tags },
};
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>