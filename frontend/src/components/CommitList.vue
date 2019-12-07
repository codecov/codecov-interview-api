<template>
  <div class="container">
    <p>
      <strong>{{git_provider}}</strong>
    </p>
    <p>{{repo_name}}</p>
    <CommitItem v-for="item in commits" v-bind:commit="item" v-bind:key="item.hash"></CommitItem>
  </div>
</template>

<script lang="ts">
import CommitItem from "@/components/CommitItem.vue";

export default {
  name: "CommitList",
  components: {
    CommitItem
  },
  props: ["commits", "git_provider", "repo_name"]
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
</style>
