import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBSRP3BHGLRnxkYr2to7Isl19bTZZnSqkw",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "jacksons-salon.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "jacksons-salon",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "jacksons-salon.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1066170413063",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1066170413063:web:b5922c26d1d1aca0debaa2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
