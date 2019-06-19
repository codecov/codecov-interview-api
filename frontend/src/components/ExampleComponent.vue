<template>
  <div class="container">
    <h1>Cookiecutter Django Vue </h1>
    <p align="center">
      <img src="https://i.imgur.com/SA8cjs8.png">
    </p>
    <p>
      {{ response }}
    </p>
  </div>
</template>

<script lang="ts">

// calling the backend directly from a vue component is a bad example, 
// this is here just to demonstrate the backend loading data
import axios from 'axios';

export default {
  name: 'FirstComponent',
  data: function() {
         return  {
           response: []
         }
    },
    created: function(){
        axios.get('http://0.0.0.0:8000/api/users').then(response => this.response = response.data);
    }
}
</script>

<style lang="scss" scoped>
  h1 {
    text-align: center;
  }
</style>
