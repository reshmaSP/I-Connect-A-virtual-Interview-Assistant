// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkx_DD9rDK4p4MOYwFprp2yPnvCDnneUU",
  authDomain: "virtual-int-asst.firebaseapp.com",
  projectId: "virtual-int-asst",
  storageBucket: "virtual-int-asst.appspot.com",
  messagingSenderId: "802230210837",
  appId: "1:802230210837:web:e142bbc6f40bd702ca591c",
  measurementId: "G-1V1KPLPNMR",
  databaseURL:"https://virtual-int-asst-default-rtdb.firebaseio.com"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
