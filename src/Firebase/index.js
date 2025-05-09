// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwTdKct6e5__CBpL_AQWxvkbWPaowgkyU",
  authDomain: "my-money-manager-47116.firebaseapp.com",
  projectId: "my-money-manager-47116",
  storageBucket: "my-money-manager-47116.firebasestorage.app",
  messagingSenderId: "793561169553",
  appId: "1:793561169553:web:7f712b4d888fcf57f74930",
  measurementId: "G-L8FW51YG7H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let db = getFirestore(app);
let auth = getAuth(app);

export { db, auth };
