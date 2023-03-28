<template>
    <div id="list">
      <h1 class="subtitle has-text-centered">My Visits:</h1>
      <hr />
      <div class="field has-addons">
        <div class="control is-expanded">
          <span class="icon has-text-info" @click="showForm">
            <i class="material-icons">add</i>
            <span>Add Visit</span>
          </span>
          <VisitForm v-if="show" @new-visit="addVisit" @close="closeForm" />
        </div>
      </div>
      <div class="notification" v-for="(item, i) in items" :key="item._id">
        <div class="columns notification-header" @click="item.detailsOpen = !item.detailsOpen">
          <p class="column">
            <span class="tag is-primary">{{ i + 1 }}</span>
            {{ item.destination.name }}
          </p>
          <p v-if="item.rating != null && item.rating != 0" class="column">My Rating: {{ item.rating }}</p>
          <div class="column is-narrow">
            <span class="icon has-text-primary" @click="select(item)">
              <i class="material-icons">edit</i>
            </span>
            <span class="icon has-text-info" @click="removeItem(item, i)">
              <i class="material-icons">delete</i>
            </span>
          </div>
        </div>
        <div class="details" v-if="item.detailsOpen">
          <p>Address: {{ item.destination.address }}</p>
          <p>Cuisine: {{ item.destination.cuisine }}</p>
          <p>Average Rating: {{ item.destination.rating }}</p>
          <p>Date Visited: {{ new Date(item.dateVisited).toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "2-digit" }) }}</p>
        </div>
      </div>
    </div>
  </template>
  <script>
  import VisitForm from './VisitForm.vue'
  import { useStore } from 'vuex';
  import { computed, watchEffect, ref } from 'vue';
  import axios from "axios";
  import { getAuth, signOut } from '@firebase/auth';
  import router from '../router';
  
  let auth
  export default {
    setup() {
      auth = getAuth();
      const store = useStore();
      const uid = computed(() => store.state.uid);
      const items = ref([]);
      const selectedVisit = computed({
        get() {
          return store.state.selectedVisit;
        },
        set(newVisit) {
          store.commit('setSelectedVisit', newVisit);
        },
      });

      watchEffect(async () => {
        if (uid.value) {
          try{
            const response = await axios.get(process.env.VUE_APP_API_URL+`/api/visits/${uid.value}`,{
              headers: {'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`}
            });
            if(response.data.message && (response.data.message.includes("Decoding Firebase ID token failed")||
                                        response.data.message.includes("Firebase ID token has expired"))){
              this.handleSignOut()
            }else{
              console.log(response.data)
              items.value = response.data;
            }
          }catch(error){
            console.log(error);
          }
        }
      });
      return { uid, selectedVisit, items };
    },
    name: 'MyVisits',
    components: {
      VisitForm,
    },
    data() {
      return {
        show: null
      };
    },
    methods: {
      addVisit(visit) {
        this.items.push(visit);
      },
      handleSignOut() {
        signOut(auth).then(() => {
          router.push("sign-in");
        });
      },
      showForm() {
        this.selectedVisit = null
        this.show = true
      },
      closeForm() {
        this.show = null
        this.selectedVisit = null
      },
      async removeItem(item, i) {
        await axios.delete(process.env.VUE_APP_API_URL+'/api/visits/' + item._id, {
          headers: {'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`}
        });
        this.items.splice(i, 1);
      },
      select(item){
        this.selectedVisit = item
        this.show = true
        item.detailsOpen = !item.detailsOpen
      },
      unselect() {
        this.selectedVisit = null
      }
    },
    computed: {
      nameExists() {
        return this.name != '';
      }
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
  .icon {
    cursor: pointer;
    margin-left: 3em;
  }
  .icon .material-icons {
    font-size: 2.25em;
  }
  .icon span {
    font-size: 1em;
    white-space: nowrap;
  }
  .subtitle {
    color: #ffffff;
  }
  .field {
    width: 60vw;
    display: block;
    margin : 0 auto;
  }
  .notification-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }
  </style>
  