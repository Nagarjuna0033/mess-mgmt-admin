// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs , setDoc} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB69ELzb7fP0CslaSf4mVnAydC_2pITQuc",
  authDomain: "mess-management-250df.firebaseapp.com",
  projectId: "mess-management-250df",
  storageBucket: "mess-management-250df.firebasestorage.app",
  messagingSenderId: "1036113362614",
  appId: "1:1036113362614:web:f48fd0d898878b2c83b017",
  measurementId: "G-RB8617VMS1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {app,analytics,db,collection,getDocs ,setDoc}