import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyDSk7TkFDUJrpMSpTT5jVmI6h9C89KmudQ",
    authDomain: "fir-webapp-8906f.firebaseapp.com",
    projectId: "fir-webapp-8906f",
    storageBucket: "fir-webapp-8906f.appspot.com",
    messagingSenderId: "810943737108",
    appId: "1:810943737108:web:9955a157798a91f657e601"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const loginForm = document.querySelector("#loginForm");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const loginEmail = document.querySelector("#loginEmail").value;
    const loginPassword = document.querySelector("#loginPassword").value;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("user", user);
            console.log(userCredential);
            const currentUserUID = user.uid;
            const currentUserName = user.displayName;
            sessionStorage.setItem("currentUserUID", currentUserUID);
            sessionStorage.setItem("currentUserName", currentUserName);
            console.log(currentUserName);
            console.log(currentUserUID);
            displayAlert("Login Successfully", "green");

            setTimeout(() => {
                location.assign("home/home.html");
            }, 2000);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            displayAlert(errorMessage, "red");
            // ..
        });
});

const alertBox = document.querySelector("#alertBox");
const displayAlert = (txt, clss) => {
    alertBox.textContent = txt;
    alertBox.classList.add(clss);
    // remove alert
    setTimeout(() => {
        alertBox.textContent = "";
        alertBox.classList.remove(clss);
    }, 2000);
};