import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBZiy2ppIrgwNzP1f2C4ONdhXCNUYL3vXY",
  authDomain: "sample-training-react-app.firebaseapp.com",
  projectId: "sample-training-react-app",
  storageBucket: "sample-training-react-app.firebasestorage.app",
  messagingSenderId: "578503748406",
  appId: "1:578503748406:web:e8d11a1233155a6203a197"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };