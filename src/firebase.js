import firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyCPWRyLbIk-j3tD9aQ99lAkPReRwKthnKI",
  authDomain: "issuemodule.firebaseapp.com",
  projectId: "issuemodule",
  storageBucket: "issuemodule.appspot.com",
  messagingSenderId: "405008571868",
  appId: "1:405008571868:web:c0247f797abe761283c319"
});

const firestore = firebase.firestore();
export default firestore;
