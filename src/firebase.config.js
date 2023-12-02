// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0sh4S_W8pPj5wC8UOna94rA1ao3vmTSQ",
  authDomain: "nyumba-19203.firebaseapp.com",
  projectId: "nyumba-19203",
  storageBucket: "nyumba-19203.appspot.com",
  messagingSenderId: "1000872603112",
  appId: "1:1000872603112:web:cb7c1f0a33a9e49f6bc85d",
  measurementId: "G-301G7M2EEX"
};

// Initialize Firebase
 initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const db = getFirestore();