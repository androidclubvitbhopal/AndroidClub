import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDlZPHqfjRtp3BjOVJG9QNdfJde1NBceO0",
    authDomain: "android-club-65a70.firebaseapp.com",
    projectId: "android-club-65a70",
    storageBucket: "android-club-65a70.appspot.com",
    messagingSenderId: "845947477263",
    appId: "1:845947477263:web:deb5ac82aa06947dc1327a",
    measurementId: "G-45FZBQZJPW"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  export const auth =getAuth()
  export const storage = getStorage()
  export const db = getFirestore(app);