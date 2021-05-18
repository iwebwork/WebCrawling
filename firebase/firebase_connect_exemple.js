const firebase = require('firebase');

const firebaseConfig = {
    apiKey: "***",
    authDomain: "***",
    databaseURL: "***",
    projectId: "***",
    storageBucket: "***",
    messagingSenderId: "***",
    appId: "***",
    measurementId: "***"
  };
  // Initialize Firebase

const app = firebase.initializeApp(firebaseConfig);

module.exports = app