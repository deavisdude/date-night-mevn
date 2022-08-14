<template>
  <div id="app">
    <h1 class="subtitle has-text-centered">Restauraunts to try:</h1>
    <hr />
    <div class="field has-addons">
      <div class="control is-expanded">
        <input class="input" v-model="name" type="text" placeholder="Add a destination..." />
      </div>
      <div class="control">
        <a class="button is-info" @click="addItem" v-if="nameExists">Add</a>
      </div>
    </div>
    <div class="notification" v-for="(item, i) in items" :key="item._id">
      <div class="columns">
        <input class="column input" v-if="isSelected(item)" v-model="editedName" />
        <p v-else class="column">
          <span class="tag is-primary">{{ i + 1 }}</span>
          {{ item.name }}
        </p>
        <div class="column is-narrow">
          <span class="icon has-text-primary" @click="isSelected(item) ? unselect() : select(item)">
            <i class="material-icons">{{ isSelected(item) ? 'close' : 'edit' }}</i>
          </span>
          <span class="icon has-text-info" @click="isSelected(item) ? updateItem(item, i) : removeItem(item, i)">
            <i class="material-icons">{{ isSelected(item) ? 'save' : 'delete' }}</i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'App',
  data() {
    return {
      items: [],
      name: '',
      editedName: '',
      selected: {}
    };
  },
  async mounted() {
    const response = await axios.get('http://127.0.0.1:81/api/destinations/');
    this.items = response.data;
  },
  methods: {
    async addItem() {
      const response = await axios.post('http://127.0.0.1:81/api/destinations/', {
         name: this.name
      });
      this.items.push(response.data)
      this.name=""
    },
    async removeItem(item, i) {
      await axios.delete("http://127.0.0.1:81/api/destinations/" + item._id);
      this.items.splice(i, 1);
    },
    select(item){
      this.selected = item;
      this.editedName = item.name;
    },
    isSelected(item){
      return item._id === this.selected._id;
    },
    unselect() {
      this.selected = {}
    },
    async updateItem(item, i) {
      const response= await axios.put("http://127.0.0.1:81/api/destinations/" + item._id, {
        name: this.editedName
      });
      this.items[i] = response.data;
      this.unselect();
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
#app {
  margin: auto;
  margin-top: 3rem;
  max-width: 700px;
}
.icon {
  cursor: pointer;
}
</style>
