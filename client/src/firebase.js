// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-72aaf.firebaseapp.com",
  projectId: "mern-auth-72aaf",
  storageBucket: "mern-auth-72aaf.appspot.com",
  messagingSenderId: "768844544973",
  appId: "1:768844544973:web:fbe20e8287bc128761e284"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);