import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCACdyIlB2BuhLgckV0Ql9Q_Fk__-bcOI0",
  authDomain: "chat-5e70a.firebaseapp.com",
  projectId: "chat-5e70a",
  storageBucket: "chat-5e70a.appspot.com",
  messagingSenderId: "626497386770",
  appId: "1:626497386770:web:69c7899d0676813c3fdbcb"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
