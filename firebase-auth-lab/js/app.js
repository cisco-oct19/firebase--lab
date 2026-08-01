// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_oh7F0BTn3iC7dTr-5IyjixCWcPw-Qk8",
    authDomain: "lab-auth-firebase-f5b22.firebaseapp.com",
    projectId: "lab-auth-firebase-f5b22",
    storageBucket: "lab-auth-firebase-f5b22.firebasestorage.app",
    messagingSenderId: "776015815147",
    appId: "1:776015815147:web:76a26c5015336ae9afb9ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Test
console.log("Firebase conectado correctamente");
console.log(app);

//Form
const formRegistro = document.getElementById("form-registro");

if (formRegistro) {
    formRegistro.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email-registro").value;
        const password = document.getElementById("password-registro").value;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            alert("Usuario registrado correctamente");

            console.log("Usuario creado:", userCredential.user);

            window.location.href = "index.html";
        } catch (error) {
            console.error("Error al registrar usuario:", error.message);
            alert("Error al registrar usuario: " + error.message);
        }
    });
}

// Conexion Form
const formLogin = document.getElementById("form-login");

if (formLogin) {
    formLogin.addEventListener("submit", async (event) => {
        event.preventDefault();
        const email = document.getElementById("email-login").value;

        const password = document.getElementById("password-login").value;

        try {
            const userCredential = 
              await signInWithEmailAndPassword(
                auth,
                email,
                password
              );

            console.log(
                "Usuario autenticado:",
                userCredential.user
            );

            alert("Inicio de sesión exitoso");
            window.location.href = "dashboard.html";

        } catch (error) {

            console.error(error);
            alert(
                "Correo electrónico o contraseña incorrectos"
            );
        }
    });
}

// Private
const usuarioInfo = document.getElementById("usuario-info");

if (usuarioInfo) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      usuarioInfo.textContent =
      "Bienvenido: " + user.email;
    } else {
      window.location.href = "index.html";
    }
  });
} 

const btnLogout = document.getElementById("btn-logout");
if (btnLogout) {
    btnLogout.addEventListener("click", async () => {
        try {
            await signOut(auth);
            alert("Sesión cerrada correctamente");
            window.location.href = "index.html";
        } catch (error) {
            console.error(error);
            alert("Error al cerrar sesión");
        }
    });
}