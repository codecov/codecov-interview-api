<template>
  <div class="container">
    <div>
      <CommitList v-bind:commits="github_commits" git_provider="Github" repo_name="pytest"></CommitList>
    </div>
    <div>
      <CommitList v-bind:commits="bitbucket_commits" git_provider="Bitbucket" repo_name="thg"></CommitList>
    </div>
    <div>
      <hr />
      <button v-on:click="syncCommits">Sync</button>
    </div>
  </div>
</template>

<script lang="ts">
import CommitList from "@/components/CommitList.vue";

// calling the backend directly from a vue component is a bad example,
// this is here just to demonstrate the backend loading data
import axios from "axios";

export default {
  name: "CommitDisplayPageComponent",
  components: {
    CommitList
  },
  // Try converting to function
  data: {
    github_commits: [],
    bitbucket_commits: []
  },
  methods: {
    syncCommits: function() {
      let self = this;
      axios.get("http://localhost:8000/api/commits/sync").then(response => {
        self.github_commits = response.data.github_commits;
        self.bitbucket_commits = response.data.bitbucket_commits;
      });

      // Potential alternative
      /**
       * 
       *       axios.post("http://localhost:8000/api/commits/sync"); // be able to specify which providers/repos
      axios.get("http://localhost:8000/api/commits"); // query paramets providers/repos
       */
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
</style>
