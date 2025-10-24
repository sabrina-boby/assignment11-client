// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtyUzqpquTRIpBKklx2gNpzAM9lPQvITM",
  authDomain: "language-schol.firebaseapp.com",
  projectId: "language-schol",
  storageBucket: "language-schol.firebasestorage.app",
  messagingSenderId: "271837036851",
  appId: "1:271837036851:web:1a6487cd2dfc72bb7fbe46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);