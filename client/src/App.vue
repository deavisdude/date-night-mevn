<template>
  <nav id="navbar">
    <div style="display: flex; align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center;">
        <router-link :handle-sign-out="handleSignOut" to="/" v-if="isLoggedIn"><button class="navButton button is-info">My List</button></router-link>
        <router-link :handle-sign-out="handleSignOut" to="/global-list" v-if="isLoggedIn"><button class="navButton button is-info">Global List</button></router-link>
        <router-link to="/ratings" v-if="isLoggedIn"><button class="navButton button is-info">Ratings</button></router-link>
        <router-link to="/register" v-if="!isLoggedIn"><button class="navButton button is-info">Register</button></router-link>
        <router-link to="/sign-in" v-if="!isLoggedIn"><button class="navButton button is-info">Login</button></router-link>
      </div>
      <div style="margin-right: 10px; font-weight: bold; font-size: 1.2rem;">Welcome, {{ username }}</div>
      <button class="navButton button is-info" @click="handleSignOut" v-if="isLoggedIn">Sign Out</button>
    </div>
  </nav>
  <router-view />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import router from './router';
import { useStore } from 'vuex';

const store = useStore();
const isLoggedIn = ref(false);
const username = ref('');

let auth;
onMounted (() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if(user) {
      isLoggedIn.value = true;
      username.value = user.displayName
      store.commit('setUsername', username.value);
      store.commit('setUid', user.uid);
    } else {
      isLoggedIn.value = false;
      username.value = '';
      store.commit('setUsername', '');
      store.commit('setUid', '');
    }
  });
});
const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("sign-in");
  });
};
</script>

<style>
#navbar {
  background: #1B262C;
  color: #ffffff;
}

.navButton {
  margin: 5px 5px;
}
</style>