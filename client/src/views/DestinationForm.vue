<template>
  <div class="form-popup">
    <form @submit.prevent="handleSubmit">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="destination.name" required>

      <label for="address">Address:</label>
      <input type="text" id="address" v-model="destination.address">

      <label for="cuisine">Cuisine:</label>
      <input type="text" id="cuisine" v-model="destination.cuisine">

      <label for="rating">Rating:</label>
      <input type="number" id="rating" v-model="destination.rating" min="0" max="10" step="0.01">

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
  name: 'DestinationForm',
  data() {
    if(this.selectedDestination != null){
      return {destination: this.selectedDestination}
    }else{
      return {
        destination : {
          name: '',
          address: '',
          cuisine: '',
          rating: 0
        }
      }
    }
    
  },
  methods: {
    async handleSubmit() {
      try {
        const uid = this.uid;
        if(this.selectedDestination == null){
          await axios.post(process.env.VUE_APP_API_URL+`/api/destinations/${uid}`, this.destination, {
            headers: {'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`}
          });
          this.$emit('new-destination', this.destination);
        }else{
          await axios.put(process.env.VUE_APP_API_URL+`/api/destinations/${this.destination._id}`, this.destination, {
            headers: {'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`}
          });
          this.$emit('close');
        }
        
    
      } catch (error) {
        console.error(error)
      }
      this.$emit('close');
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
