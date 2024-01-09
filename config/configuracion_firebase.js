// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxhFhBFgZ-EAhJLNEuAHq-HcgJN9ayta8",
  authDomain: "libros-7cb49.firebaseapp.com",
  projectId: "libros-7cb49",
  storageBucket: "libros-7cb49.appspot.com",
  messagingSenderId: "405012129384",
  appId: "1:405012129384:web:2d70c184428e9ce760bddd"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;