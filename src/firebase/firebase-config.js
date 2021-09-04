import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvfGfHNLbne3SuSy35GS6rWy3zoijZa4I",
  authDomain: "quintero-journal-react.firebaseapp.com",
  projectId: "quintero-journal-react",
  storageBucket: "quintero-journal-react.appspot.com",
  messagingSenderId: "104941994153",
  appId: "1:104941994153:web:3c1719fd9c0f53b9dee9b8",
  measurementId: "G-17DD7VBBWS",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

export { db, googleAuthProvider, app };
