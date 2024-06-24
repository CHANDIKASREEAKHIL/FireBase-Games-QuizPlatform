// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDrB9FupDgjjVk4_guLC24ydG3retE3bME",
//   authDomain: "login-auth-4736e.firebaseapp.com",
//   projectId: "login-auth-4736e",
//   storageBucket: "login-auth-4736e.appspot.com",
//   messagingSenderId: "10562914305",
//   appId: "1:10562914305:web:2cff37be4fa9ccf0a29800"
// };

// my web app's firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDClIgIUtgGmTtOMqshVGmySkulhcf7xXI",
  authDomain: "gamequiz-2e893.firebaseapp.com",
  projectId: "gamequiz-2e893",
  storageBucket: "gamequiz-2e893.appspot.com",
  messagingSenderId: "685923239474",
  appId: "1:685923239474:web:84d074559d81c31c589e2b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;

