import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbjxnaBvm3lx-zph5BjsttzlG6dW8xxxw",
  authDomain: "date-night-mevn.firebaseapp.com",
  projectId: "date-night-mevn",
  storageBucket: "date-night-mevn.appspot.com",
  messagingSenderId: "1054265433143",
  appId: "1:1054265433143:web:9fc18db10198531a3573b2"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App)

app.use(router)

app.mount('#app')
