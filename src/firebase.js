import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD1qdakKQyXqHvRDZuHaz0QQlGP_zDb4NA",
  authDomain: "chat-642b1.firebaseapp.com",
  projectId: "chat-642b1",
  storageBucket: "chat-642b1.appspot.com",
  messagingSenderId: "159140334238",
  appId: "1:159140334238:web:bd7f84cb8f966179adc98f"
};

export const app=initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();