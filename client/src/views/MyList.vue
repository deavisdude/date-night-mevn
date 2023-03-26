<template>
  <div id="list">
    <h1 class="subtitle has-text-centered">Restaurants I want to try:</h1>
    <hr />
    <div class="field has-addons">
      <div class="control is-expanded">
        <span class="icon has-text-info" @click="showForm">
          <i class="material-icons">add</i>
          <span>Add Destination</span>
        </span>
        <DestinationForm v-if="show" @new-destination="addDestination" @close="closeForm" />
      </div>
    </div>
    <div class="notification" v-for="(item, i) in items" :key="item._id">
      <div class="columns notification-header" @click="item.detailsOpen = !item.detailsOpen">
        <p class="column">
          <span class="tag is-primary">{{ i + 1 }}</span>
          {{ item.name }}
        </p>
        <p v-if="item.rating != null && item.rating != 0" class="column">Rating: {{ item.rating }}</p>
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
        <p>Address: {{ item.address }}</p>
        <p>Cuisine: {{ item.cuisine }}</p>
        <p>Visits: {{ item.visits.length }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import DestinationForm from './DestinationForm.vue'
import { useStore } from 'vuex';
import { computed } from 'vue';
import axios from "axios";
export default {
  setup() {
    const store = useStore();
    const uid = computed({
      get() {
        return store.state.uid;
      },
      set(newUid) {
        store.commit('setUid', newUid);
      },
    });
    const selectedDestination = computed({
      get() {
        return store.state.selectedDestination;
      },
      set(newDestination) {
        store.commit('setSelectedDestination', newDestination);
      },
    });
    return { uid, selectedDestination };
  },
  name: 'MyList',
  components: {
    DestinationForm,
  },
  data() {
    return {
      show: null,
      items: [],
      name: ''
    };
  },
  async mounted() {
    const store = useStore(); // get reference to store
    const uid = store.state.uid; // retrieve uid value from store
    try{
      const response = await axios.get(process.env.VUE_APP_API_URL+`/api/destinations/${uid}`,{
        headers: {'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`}
      });
      console.log(response)
      this.items = response.data;
    }catch(error){
      console.log(error)
      console.log('CODE: ' + error.code)
      if (error.code === 'auth/id-token-expired') {
        // Token has expired, sign the user out
        this.$root.$emit('signOut')
        console.log('Token has expired, sign the user out')
      } else if (error.code === 'auth/argument-error') {
        // Token is invalid, sign the user out
        this.$root.$emit('signOut')
        console.log('Token has expired, sign the user out')
      } else {
        // Handle other errors
        console.log(error);
      }
    }
  },
  methods: {
    addDestination(destination) {
      this.items.push(destination);
    },
    showForm() {
      this.selectedDestination = null
      this.show = true
    },
    closeForm() {
      this.show = null
      this.selectedDestination = null
    },
    async removeItem(item, i) {
      await axios.delete(process.env.VUE_APP_API_URL+'/api/destinations/' + item._id, {
        headers: {'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`}
      });
      this.items.splice(i, 1);
    },
    select(item){
      this.selectedDestination = item
      this.show = true
      item.detailsOpen = !item.detailsOpen
    },
    unselect() {
      this.selectedDestination = null
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
