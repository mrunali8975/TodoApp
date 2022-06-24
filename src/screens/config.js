

// import { Database } from "firebase/database";
// import { initializeApp } from "@firebase/app";
// import { getFirestore } from "@firebase/firestore";
import firestore from '@react-native-firebase/firestore'
import app from '@react-native-firebase/firestore'
import { firebase } from "@react-native-firebase/database";
const firebaseConfig = {
    apiKey: 'AIzaSyC3fCoyVPUH-xlMfV_47DoZOW9PBGIwrak',
    authDomain: 'test-XXXX.firebaseapp.com',
    databaseURL: 'https://databaseproject-b4e01-default-rtdb.firebaseio.com',
    projectId: 'databaseproject-b4e01',
    storageBucket: 'databaseproject-b4e0.appspot.com',
    messagingSenderId: '398554013566',
    appId: "1:398554013566:android:c069ed0d5382bb40905d2f"
  };
  // const app = initializeApp(firebaseConfig)
  // const db = getFirestore(app)
  // export {db}

   export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

  export  {db};
