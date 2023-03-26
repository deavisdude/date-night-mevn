<template>
    <div id="list">
      <h1 class="subtitle has-text-centered">Restaurants:</h1>
      <hr />
      <div class="notification" v-for="(item, i) in items" :key="item._id">
        <div class="columns notification-header" @click="item.detailsOpen = !item.detailsOpen">
          <p class="column">
            <span class="tag is-primary">{{ i + 1 }}</span>
            {{ item.name }}
          </p>
          <p v-if="item.rating != null && item.rating != 0" class="column">Rating: {{ item.rating }}</p>
        </div>
        <div class="details" v-if="item.detailsOpen">
          <p>Address: {{ item.address }}</p>
          <p>Cuisine: {{ item.cuisine }}</p>
          <p>Visits: {{ item.visits.length }}</p>
      </div>
      </div>
    </div>
  </template>
  <script>
  import axios from "axios";
  import { getAuth, signOut } from '@firebase/auth';
  import router from '../router';
  let auth
  export default {
    name: 'GlobalList',
    data() {
      return {
        items: []
      };
    },
    async mounted() {
      auth = getAuth()
      const response = await axios.get(process.env.VUE_APP_API_URL+`/api/destinations/`,{
        headers: {'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`}
      });
      if(response.data.message && (response.data.message.includes("Decoding Firebase ID token failed")||
                                   response.data.message.includes("Firebase ID token has expired"))){
        this.handleSignOut()
      }else{
        this.items = response.data;
      }
    },
    methods: {
      handleSignOut() {
        signOut(auth).then(() => {
          router.push("sign-in");
        });
      },
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
  margin-bottom: 1rem; /* Add margin between items */
  }
  .notification .details {
    background: #0C3447;
    color: #ffffff;
    padding: 10px;
  }
  .notification-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }
  .subtitle {
    color: #ffffff;
  }
  </style>
  