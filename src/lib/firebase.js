import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "react-chat-a1154.firebaseapp.com",
  projectId: "react-chat-a1154",
  storageBucket: "react-chat-a1154.firebasestorage.app",
  messagingSenderId: "1089635323572",
  appId: "1:1089635323572:web:c177479ee1f4e0e23ad1e1"
};

 
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()

