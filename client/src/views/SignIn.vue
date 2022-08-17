<template>
    <div id="signin">
        <h1 class="subtitle has-text-centered">Sign In:</h1>
        <div class="control is-expanded">
            <input class="input" v-model="email" type="text" placeholder="johnny@doemail.com" />
            <input class="input" v-model="password" type="text" placeholder="***********" />
            <p class="error" v-if="errMsg">{{ errMsg }}</p>
        </div>
        <div class="control">
            <a class="SIButton button is-info" @click="signIn">Sign In</a>
            <button class="SIButton button is-info" @click="signInWithGoogle">Sign In With Google</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import {
  getAuth, 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const errMsg = ref();
const router = useRouter()

const signIn = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
        .then(() => {
            console.log("Successfully signed in!");
            router.push('/')
        })
        .catch(() => {
            errMsg.value = "Email or password was incorrect";
        });
};

const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user);
      router.push("/");
    })
    .catch((error) => {
      alert(error.message)
    });
}
</script>

<style>
#signin {
  width: 100vw;
  min-height: 100vh;
  background: #1B262C;
  color: #ffffff;
}
.input {
  background: #0F4C75;
  color: #ffffff;
}
.subtitle {
  color: #ffffff;
}
input[type="text"]::placeholder {
  color: #ffffff60;
  opacity:  1;
}
.control {
  width: 50vw;
  display: block;
  margin : 0 auto;
}
.SIButton {
  width: 200px;
  display: block;
  margin : 10px auto;
}
.error { 
  color: red;
  text-align: center;
}
</style>