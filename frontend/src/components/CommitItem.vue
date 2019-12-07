<template>
  <div class="container">{{ commit.commit_hash}} {{commit.message }}</div>
</template>

<script lang="ts">
export default {
  name: "CommitItem",
  props: ["commit"]
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
</style>
