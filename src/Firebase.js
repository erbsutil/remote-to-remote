import firebase from "firebase/app";

const { REACT_APP_KEY, REACT_APP_NAME, REACT_APP_ID } = process.env;

const settings = { timestampsInSnapshots: true };

const config = {
  apiKey: REACT_APP_KEY,
  authDomain: REACT_APP_NAME + ".firebaseapp.com",
  projectId: REACT_APP_NAME,
  storageBucket: REACT_APP_NAME + ".appspot.com",
  messagingSenderId: "1043896813340",
  appId: REACT_APP_ID,
  measurementId: "G-Z314MNEHDX",
};

firebase.initializeApp(config);
firebase.firestore().settings(settings);

export default firebase;
