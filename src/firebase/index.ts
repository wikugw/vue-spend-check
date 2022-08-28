// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTBfaqNTuDgP14J7NXdsQRQDGATkpjVMs",
  authDomain: "vue-spend-checker.firebaseapp.com",
  projectId: "vue-spend-checker",
  storageBucket: "vue-spend-checker.appspot.com",
  messagingSenderId: "970852340596",
  appId: "1:970852340596:web:5b3a206aa2fe6f7b5b1221"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db