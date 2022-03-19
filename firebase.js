import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA1fdczDIt23_0uFxm8VYAN5n14ejml2JM",
  authDomain: "glloc-2aee5.firebaseapp.com",
  databaseURL: "https://glloc-2aee5-default-rtdb.firebaseio.com",
  projectId: "glloc-2aee5",
  storageBucket: "glloc-2aee5.appspot.com",
  messagingSenderId: "1054549077242",
  appId: "1:1054549077242:web:9031b69124b5ebe3b26d43",
  measurementId: "G-S3PJ7DKLL7",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
