
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA-hi73jOaU-Gepxbcr_kSrV3VlEkFf0QQ",
  authDomain: "greenshop-abdulaziz.firebaseapp.com",
  projectId: "greenshop-abdulaziz",
  storageBucket: "greenshop-abdulaziz.firebasestorage.app",
  messagingSenderId: "247311622539",
  appId: "1:247311622539:web:03d8fbc864ed6eff19cf8e",
  measurementId: "G-MVT264Z92L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

export { signInWithGoogle };;