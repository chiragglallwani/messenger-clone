import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAO0J2aa5H2MsxdpAugx_eytjo-ERZhfAo",
    authDomain: "messenger-clone-28ccd.firebaseapp.com",
    databaseURL: "https://messenger-clone-28ccd.firebaseio.com",
    projectId: "messenger-clone-28ccd",
    storageBucket: "messenger-clone-28ccd.appspot.com",
    messagingSenderId: "197074304062",
    appId: "1:197074304062:web:69b5034c1fdef74167256f",
    measurementId: "G-KHTB675T2Z"
  });

  const db = firebase.firestore();

  export default db ;