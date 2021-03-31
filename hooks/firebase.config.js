import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyDM1wZaEJ7zCnKJjCn742NVnuNRtvn97sg",
    authDomain: "xo-game-1cdbd.firebaseapp.com",
    databaseURL: "https://xo-game-1cdbd-default-rtdb.firebaseio.com",
    projectId: "xo-game-1cdbd",
    storageBucket: "xo-game-1cdbd.appspot.com",
    messagingSenderId: "315804142218",
    appId: "1:315804142218:web:ecfebd6e0abd2245fcbb73",
    measurementId: "G-Z3YN8SVWTZ"
};

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
