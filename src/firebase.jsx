// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtBciZH_L0OqAmkcoXZUld9kjYWtmjrNY",
  authDomain: "tracknest-s04.firebaseapp.com",
  projectId: "tracknest-s04",
  storageBucket: "tracknest-s04.firebasestorage.app",
  messagingSenderId: "920035222083",
  appId: "1:920035222083:web:f08e54418280efade06af6",
  measurementId: "G-3YMWFX82BW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };