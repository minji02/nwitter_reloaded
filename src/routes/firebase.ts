import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPOsNASFVGeaxaoV_Jan3NHWL-nOjQUQg",
  authDomain: "twitter-clone-32fea.firebaseapp.com",
  projectId: "twitter-clone-32fea",
  storageBucket: "twitter-clone-32fea.appspot.com",
  messagingSenderId: "1069092215018",
  appId: "1:1069092215018:web:458f5a7b1ad15ac7401f93",
  measurementId: "G-RQCQ9TEGP2",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
