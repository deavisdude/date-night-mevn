<template>
    <div class="form-popup">
      <form @submit.prevent="handleSubmit">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="visit.destination.name" required>
  
        <label for="address">Address:</label>
        <input type="text" id="address" v-model="visit.destination.address">
  
        <label for="cuisine">Cuisine:</label>
        <input type="text" id="cuisine" v-model="visit.destination.cuisine">
  
        <label for="rating">Rating:</label>
        <input type="number" id="rating" v-model="visit.rating" min="0" max="10" step="0.01">
  
        <div class="form-buttons">
          <button type="submit">Save</button>
          <button type="button" @click="closeForm">Close</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { useStore } from 'vuex';
  import { computed } from 'vue';
  import axios from "axios";
  import { getAuth, signOut } from '@firebase/auth';
  import router from '../router';
  
  let auth
  export default {
    setup() {
      auth = getAuth()
      const store = useStore();
      const uid = computed({
        get() {
          return store.state.uid;
        },
        set(newUid) {
          store.commit('setUid', newUid);
        },
      });
      const selectedVisit = computed({
        get() {
          return store.state.selectedVisit;
        },
        set(newVisit) {
          store.commit('setSelectedVisit', newVisit);
        },
      });
      return { uid, selectedVisit };
    },
    name: 'VisitForm',
    data() {
      if(this.selectedVisit != null){
        return {visit: this.selectedVisit}
      }else{
        return {
          visit : {
            rating: 0,
            dateVisited: '',
            user: {},
            destination: {}
          }
        }
      }
    },
    methods: {
      async handleSubmit() {
        try {
          const uid = this.uid;
          if(this.selectedVisit == null){
            const response = await axios.post(process.env.VUE_APP_API_URL+`/api/visits/${uid}`, this.visit, {
              headers: {'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`}
            });
            if(response.data.message && (response.data.message.includes("Decoding Firebase ID token failed")||
                                     response.data.message.includes("Firebase ID token has expired"))){
              this.handleSignOut()
            }else{
              this.$emit('new-visit', this.visit);
            }
          }else{
            const response = await axios.put(process.env.VUE_APP_API_URL+`/api/visits/${this.visit._id}`, this.visit, {
              headers: {'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`}
            });
            if(response.data.message && (response.data.message.includes("Decoding Firebase ID token failed")||
                                     response.data.message.includes("Firebase ID token has expired"))){
              this.handleSignOut()
            }else{
              this.$emit('close');
            }
          }
        } catch (error) {
          console.error(error)
        }
        this.$emit('close');
      },
      handleSignOut() {
        signOut(auth).then(() => {
          router.push("sign-in");
        });
      },
      closeForm() {
        this.$emit('close');
      },
    },
  }
  </script>
  
  <style scoped>
  .form-popup {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  form {
    background-color: #0F4C75;
    padding: 20px;
    border-radius: 10px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: none;
    margin-bottom: 10px;
  }
  
  button[type="submit"], button[type="button"] {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  button[type="button"] {
    background-color: #f44336;
    margin-left: 10px;
  }
  .form-buttons {
    display: flex;
    justify-content: space-between;
  }
  </style>
  