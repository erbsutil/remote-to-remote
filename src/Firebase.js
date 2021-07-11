import firebase from "firebase";

const { REACT_APP_KEY, REACT_APP_NAME, REACT_APP_ID } = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_KEY,
  authDomain: REACT_APP_NAME + ".firebaseapp.com",
  projectId: REACT_APP_NAME,
  storageBucket: REACT_APP_NAME + ".appspot.com",
  messagingSenderId: "1043896813340",
  appId: REACT_APP_ID,
  measurementId: "G-Z314MNEHDX",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
