// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0QvhkW52mYVAnA9_bbw2ZrNawe5z9gsc",
  authDomain: "taskmate-4fee2.firebaseapp.com",
  projectId: "taskmate-4fee2",
  storageBucket: "taskmate-4fee2.appspot.com",
  messagingSenderId: "204729520569",
  appId: "1:204729520569:web:d3fde4064d5f3a9d1a6668",
  measurementId: "G-D3MQKFRK0H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();