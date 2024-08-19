import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC8Pv4X8le2HtRpfnJtdISSl2vzilMEb3k",
    authDomain: "talk-verse.firebaseapp.com",
    projectId: "talk-verse",
    storageBucket: "talk-verse.appspot.com",
    messagingSenderId: "301603917167",
    appId: "1:301603917167:web:d893b8d301cd6b3823ac9a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
