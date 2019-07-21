import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";



var config = {
    apiKey: "AIzaSyDWoljKWUgaIIdFk4xAv0UVLPVwYKW0L9o",
    authDomain: "react-chat-9728c.firebaseapp.com",
    databaseURL: "https://react-chat-9728c.firebaseio.com",
    projectId: "react-chat-9728c",
    storageBucket: "react-chat-9728c.appspot.com",
    messagingSenderId: "860400109986"
  };
  firebase.initializeApp(config);


  export default firebase;