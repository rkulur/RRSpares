import firebase from "firebase/compat/app";
import { getStorage }from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyD8reCabysQsDZ33os1bvjH5hM6meUulHI",
    authDomain: "rrspares-48266.firebaseapp.com",
    projectId: "rrspares-48266",
    storageBucket: "rrspares-48266.appspot.com",
    messagingSenderId: "855105291388",
    appId: "1:855105291388:web:5a860617d1935e518c75f9",
    measurementId: "G-QQDT843W6X"
  };

  const app = firebase.initializeApp(firebaseConfig)
  const storage = getStorage(app)  

  export { storage, firebase as default}