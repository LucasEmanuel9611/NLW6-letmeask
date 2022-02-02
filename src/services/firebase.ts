// import firebase from 'firebase/app'
// const firebase = require('firebase')
// import * as firebase from 'firebase'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; //v9
import 'firebase/compat/database'; //v9

const firebaseConfig = {

    apiKey: process.env.REACT_APP_API_KEY,
  
    authDomain: process.env.REACT_APP_API_KEY,
  
    databaseURL: process.env.REACT_APP_DATABASE_URL,
  
    projectId: process.env.REACT_APP_PROJECT_ID,
  
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  
    appId: process.env.REACT_APP_APP_ID
  
  };
  
firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const database = firebase.database()

export { firebase, auth, database}