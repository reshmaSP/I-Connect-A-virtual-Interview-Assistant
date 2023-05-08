// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBu6Oun5y5WYrARgf3tYm6bRiWKjMc0CG4",
  authDomain: "virtual-interview-assistant.firebaseapp.com",
  projectId: "virtual-interview-assistant",
  storageBucket: "virtual-interview-assistant.appspot.com",
  messagingSenderId: "735972885309",
  appId: "1:735972885309:web:59fb7cfa2c611b36897b54",
  measurementId: "G-5Z49JXLH7H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
