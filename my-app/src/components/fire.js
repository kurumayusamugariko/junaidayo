// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaqoEKyZyZNPxSIRkNl6RXUdjCaQMCwic",
  authDomain: "junaidayo-cfc0d.firebaseapp.com",
  databaseURL: "https://junaidayo-cfc0d-default-rtdb.firebaseio.com",
  projectId: "junaidayo-cfc0d",
  storageBucket: "junaidayo-cfc0d.appspot.com",
  messagingSenderId: "300775705802",
  appId: "1:300775705802:web:867ca444740c47960f7833"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const googleProvider = new GoogleAuthProvider();
export default db;
export { auth, googleProvider};