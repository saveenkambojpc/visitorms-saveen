// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpO2eukBP345mOtGlpukUvIyZVnLnp1qE",
  authDomain: "visitorms-s.firebaseapp.com",
  projectId: "visitorms-s",
  storageBucket: "visitorms-s.appspot.com",
  messagingSenderId: "732961419944",
  appId: "1:732961419944:web:3010d68ed428811f7ec89d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app)
