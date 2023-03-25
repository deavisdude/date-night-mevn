<template>
    <div id="list">
      <h1 class="subtitle has-text-centered">Restauraunts:</h1>
      <hr />
      <div class="notification" v-for="(item, i) in items" :key="item._id">
        <div class="columns">
          <p class="column">
            <span class="tag is-primary">{{ i + 1 }}</span>
            {{ item.name }}
          </p>
          <p v-if="item.rating != null && item.rating != 0" class="column">Rating: {{ item.rating }}</p>
        </div>
      </div>
    </div>
  </template>
  <script>
  import axios from "axios";
  export default {
    name: 'GlobalList',
    data() {
      return {
        items: []
      };
    },
    async mounted() {
      const response = await axios.get(process.env.VUE_APP_API_URL+`/api/destinations/`,{
        headers: {'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`}
      });
      this.items = response.data;
    }
  };
  </script>
  
  <style>
  #list {
    width: 100vw;
    min-height: 100vh;
    background: #1B262C;
    color: #ffffff;
  }
  .notification {
    background: #0F4C75;
    color: #ffffff;
    width: 60vw;
    position: relative;
    display: block;
    margin : 0 auto;
  }
  .subtitle {
    color: #ffffff;
  }
  </style>
  