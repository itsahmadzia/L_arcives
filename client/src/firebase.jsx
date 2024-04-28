// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernproject-3ef15.firebaseapp.com",
  projectId: "mernproject-3ef15",
  storageBucket: "mernproject-3ef15.appspot.com",
  messagingSenderId: "127250165495",
  appId: "1:127250165495:web:4864a5e29442825d372df2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);