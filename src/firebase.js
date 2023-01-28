import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDHJ0K8WZrrRkKCfc47cFtjCZOHVFSHZ-g",
  authDomain: "task-bdbaf.firebaseapp.com",
  projectId: "task-bdbaf",
  storageBucket: "task-bdbaf.appspot.com",
  messagingSenderId: "406487100630",
  appId: "1:406487100630:web:ddd10f8ca29178ae8fed77"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);