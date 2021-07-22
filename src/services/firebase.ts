import firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC556zFRNMFc90-2ax5wAO_ww7AmFkbcVs",
  authDomain: "alurakut-147cd.firebaseapp.com",
  projectId: "alurakut-147cd",
  storageBucket: "alurakut-147cd.appspot.com",
  messagingSenderId: "316247937835",
  appId: "1:316247937835:web:4a0d10570f22317a6feb6e",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

export { auth, firebase };
