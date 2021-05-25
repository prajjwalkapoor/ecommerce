import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyARYT6bbW9Z57boMn4ghyPmH7WSXW4LQnA",
  authDomain: "ecommerce-3b648.firebaseapp.com",
  projectId: "ecommerce-3b648",
  storageBucket: "ecommerce-3b648.appspot.com",
  messagingSenderId: "297973160327",
  appId: "1:297973160327:web:2ebcb19e0b89fd47959b22",
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;
