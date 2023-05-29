import firebase from "firebase/app";
import 'firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyDve9Uu5F2L7Ma337flOid2fSsUNkkauqo",
  authDomain: "rubricatres.firebaseapp.com",
  projectId: "rubricatres",
  storageBucket: "rubricatres.appspot.com",
  messagingSenderId: "327244427232",
  appId: "1:327244427232:web:0a24bfb83ec5f7a8a40585"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export{firebase}

