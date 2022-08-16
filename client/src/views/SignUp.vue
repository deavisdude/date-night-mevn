<template>
    <div id="signup">
        <h1 class="subtitle has-text-centered">Sign Up:</h1>
        <div class="control is-expanded">
            <input class="input" v-model="email" type="text" placeholder="johnny@doemail.com" />
            <input class="input" v-model="password" type="text" placeholder="***********" />
        </div>
        <div class="control">
            <a class="button is-info" @click="signUp">Sign Up</a>
            <button class="button is-info" @click="signUpWithGoogle">Sign Up With Google</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const router = useRouter()

const signUp = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then(() => {
            console.log("Successfully registered!");
            router.push('/')
        })
        .catch((error) => {
            console.log(error.code);
            alert(error.message);
        });
};

const signUpWithGoogle = () => {

}
</script>

<style>
#signup {
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
  color: #ffffff;
  opacity:  1;
}
.control {
  width: 60vw;
  display: block;
  margin : 0 auto;
}
.button {
  width: 200px;
  display: block;
  margin : auto auto;
}
</style>