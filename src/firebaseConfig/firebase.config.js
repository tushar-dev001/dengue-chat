// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBz04XeZ58pv5ooH3NTs1uabxRW77dm7zU",
  authDomain: "dengue-chat-edc14.firebaseapp.com",
  projectId: "dengue-chat-edc14",
  storageBucket: "dengue-chat-edc14.appspot.com",
  messagingSenderId: "1088228619115",
  appId: "1:1088228619115:web:a2a15e4e57450cccd9d22e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig