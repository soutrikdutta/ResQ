import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCyMMAHFs-j1ksFx6nivT02uF27u-MlnC8",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "resq-c04f0.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "resq-c04f0",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "resq-c04f0.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "715633100178",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:715633100178:web:34d388d1b14b53c0c5ad4b",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-N8E4E5NKJ5"
};

// Initialize Firebase App
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Cloud Firestore Database Instance
export const db = getFirestore(app);

// Cloud Storage Instance
export const storage = getStorage(app);
