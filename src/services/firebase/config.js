import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Firebase configuration from environment variables
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyC8Pv4X8le2HtRpfnJtdISSl2vzilMEb3k",
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "talk-verse.firebaseapp.com",
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "talk-verse",
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "talk-verse.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "301603917167",
    appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:301603917167:web:d893b8d301cd6b3823ac9a",
};

// Validate that required config values are present
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    console.error("Firebase configuration is missing required values. Please check your .env.local file.");
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

export default app;

