//@ts-nocheck
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY || process?.env.EXPO_PUBLIC_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN || EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID || EXPO_PUBLIC_PROJECT_ID,
  storageBucket:
    import.meta.env.VITE_STORAGE_BUCKET || EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId:
    import.meta.env.VITE_MESSAGING_SENDER_ID || EXPO_PUBLIC_MESSAGING_SENDER_ID,

  appId: import.meta.env.VITE_APP_ID || EXPO_PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
