
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDGWYvs4rda2EI1cEiA8iYqXLLvBpa5Hc",
  authDomain: "myapp-3eb44.firebaseapp.com",
  projectId: "myapp-3eb44",
  storageBucket: "myapp-3eb44.appspot.com",
  messagingSenderId: "607637675159",
  appId: "1:607637675159:web:0865010f18d75e224dddd2",
  measurementId: "G-EDDBFMT00R"
};

const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);
const database = getFirestore();
export { authentication, database };