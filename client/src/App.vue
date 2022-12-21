<template>
  <nav id="navbar">
    <router-link to="/" v-if="isLoggedIn"><button class="navButton button is-info">My List</button></router-link>
    <router-link to="/ratings" v-if="isLoggedIn"><button class="navButton button is-info">Ratings</button></router-link>
    <router-link to="/register" v-if="!isLoggedIn"><button class="navButton button is-info">Register</button></router-link>
    <router-link to="/sign-in" v-if="!isLoggedIn"><button class="navButton button is-info">Login</button></router-link>
    <button class="navButton button is-info" @click="handleSignOut" v-if="isLoggedIn"> Sign Out </button>
  </nav>
  <router-view />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import router from './router';

const isLoggedIn = ref(false);

let auth;
onMounted (() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if(user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
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