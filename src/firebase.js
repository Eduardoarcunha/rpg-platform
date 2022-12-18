import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsMm_nndKoYc0slbWBwD8-9elWbdNosNQ",
  authDomain: "rpg-platform-cafbe.firebaseapp.com",
  projectId: "rpg-platform-cafbe",
  storageBucket: "rpg-platform-cafbe.appspot.com",
  messagingSenderId: "685675182384",
  appId: "1:685675182384:web:436be851c6b7c27deff0f5",
  measurementId: "G-YVM98F4TKM",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
