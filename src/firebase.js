// firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAgvhe8SFjfvLGakEN6ZFRD8qKrGvh7A9A",

    authDomain: "myclass-6cf84.firebaseapp.com",
  
    projectId: "myclass-6cf84",
  
    storageBucket: "myclass-6cf84.appspot.com",
  
    messagingSenderId: "520136229549",
  
    appId: "1:520136229549:web:73a8c2529e61a8aa817c24",
  
    measurementId: "G-6LXQP37V9P"
  
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage };
