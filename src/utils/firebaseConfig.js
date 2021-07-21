import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAzRKdLmo3C5h0gC0ycjvAPCoiu7JKTB9o",
  authDomain: "describethis-6148e.firebaseapp.com",
  databaseURL: "https://describethis-6148e-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "describethis-6148e",
  storageBucket: "describethis-6148e.appspot.com",
  messagingSenderId: "101196711707",
  appId: "1:101196711707:web:d66ad5eceaf370d9aa75be",
  measurementId: "G-MQ8FMG5T3G"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;