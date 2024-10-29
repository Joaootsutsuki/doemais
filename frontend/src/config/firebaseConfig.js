import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD5nYZC_w4hd-9DhThvTVETNDKiqED_qYg",
  authDomain: "doe-mais-c884c.firebaseapp.com",
  projectId: "doe-mais-c884c",
  storageBucket: "doe-mais-c884c.appspot.com",
  messagingSenderId: "748533691637",
  appId: "1:748533691637:web:cc7345a4cb98f9e70541bc",
  measurementId: "G-7X6QQ4G3LE",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
