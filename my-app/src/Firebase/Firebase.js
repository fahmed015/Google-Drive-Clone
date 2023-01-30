import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYvO5QoTfy_Eao6fqKmZxKKj3vxC7M9to",
  authDomain: "driveclone-d0e92.firebaseapp.com",
  projectId: "driveclone-d0e92",
  storageBucket: "driveclone-d0e92.appspot.com",
  messagingSenderId: "226494175922",
  appId: "1:226494175922:web:68063a127d5696c11a87ab",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export function mapAuthCodeToMessage(authCode) {
  switch (authCode) {
    case "auth/invalid-password":
      return "Password provided is not corrected";

    case "auth/invalid-email":
      return "Email provided is invalid";

    case "auth/user-not-found":
      return "This user is not found";
    // Many more authCode mapping here...

    default:
      return "";
  }
}

export { auth, db, storage };
