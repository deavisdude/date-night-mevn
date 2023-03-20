<template>
  <div id="list">
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
        <p v-if="item.rating != null && item.rating != 0" class="column">Rating: {{ item.rating }}</p>
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
  name: 'MyList',
  data() {
    return {
      items: [],
      name: '',
      editedName: '',
      selected: {}
    };
  },
  async mounted() {
    const response = await axios.get(process.env.VUE_APP_API_URL+'/api/destinations/',{
      headers: {'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`}
    });
    console.log(response.data)
    this.items = response.data;
  },
  methods: {
    async addItem() {
      const response = await axios.post(process.env.VUE_APP_API_URL+'/api/destinations/', { name: this.name }, {
        headers: {'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`}
      });
      this.items.push(response.data)
      this.name=""
    },
    async removeItem(item, i) {
      await axios.delete(process.env.VUE_APP_API_URL+'/api/destinations/' + item._id, {
        headers: {'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`}
      });
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
      const response= await axios.put(process.env.VUE_APP_API_URL+'/api/destinations/' + item._id, { name: this.editedName }, {
        headers: {'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`}
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
#list {
  width: 100vw;
  min-height: 100vh;
  background: #1B262C;
  color: #ffffff;
}
.input {
  background: #0F4C75;
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
.icon {
  cursor: pointer;
}
.subtitle {
  color: #ffffff;
}
input[type="text"]::placeholder {
  color: #ffffff;
  opacity:  1;
}
.field {
  width: 60vw;
  display: block;
  margin : 0 auto;
}
</style>
