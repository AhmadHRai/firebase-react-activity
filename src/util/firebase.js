// Your firebase initial code should come here.
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcKOkZiMua_5SSnagb1GpWyjABZxUp1To",
  authDomain: "fir-react-66a09.firebaseapp.com",
  projectId: "fir-react-66a09",
  storageBucket: "fir-react-66a09.appspot.com",
  messagingSenderId: "704814829441",
  appId: "1:704814829441:web:256c03824ebf2f33c66280",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
