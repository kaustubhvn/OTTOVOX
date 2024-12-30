// Import Firebase Authentication functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCPVKX0xD12qUuZUsVMJML3ziYmM_zG27U",
    authDomain: "hardware-c4141.firebaseapp.com",
    projectId: "hardware-c4141",
    storageBucket: "hardware-c4141.appspot.com",
    messagingSenderId: "952737919097",
    appId: "1:952737919097:web:4fc7c24e916a2106d5a4a8",
    measurementId: "G-NSLYTPT3NC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Handle the sign-up form submission
document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');

    // Create user with Firebase Authentication
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            window.location.href = "home.html"; // Redirect to home page after successful signup
        })
        .catch((error) => {
            errorMsg.textContent = error.message;
            console.error(error.message);
        });
});

// Google Sign Up
document.getElementById('google-signup').addEventListener('click', () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            alert(`Welcome ${user.displayName}`);
            window.location.href = "home.html"; // Redirect to home page after successful Google sign-up
        })
        .catch((error) => {
            console.error("Error during Google sign-up:", error);
            alert("Google sign-up failed. Please try again.");
        });
});
