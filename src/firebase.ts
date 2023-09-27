import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCqW0LF8F2PzH8ZNnXhTWz_k2myqxeT2gU",
  authDomain: "trello-clone-2e4f7.firebaseapp.com",
  projectId: "trello-clone-2e4f7",
  storageBucket: "trello-clone-2e4f7.appspot.com",
  messagingSenderId: "688150726282",
  appId: "1:688150726282:web:067f4ecb14b00466b24f73"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);