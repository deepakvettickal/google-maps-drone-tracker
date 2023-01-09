import React, {useState} from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { useNavigate } from "react-router-dom";


import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAREzPUGyI4oIxTAaKxKr_7H6uowrJ38bo",
  authDomain: "drone-trac.firebaseapp.com",
  projectId: "drone-trac",
  storageBucket: "drone-trac.appspot.com",
  messagingSenderId: "782514598192",
  appId: "1:782514598192:web:ea23d8ccbfa05be919d8f5"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();




const Login = ({setAuth}) =>{
    const navigate = useNavigate();
    
    function handleLogin(){
        signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        if(credential){
            navigate('/home');
            setAuth(true);
    }

    }).catch((error) => {
        alert(error.message);
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
    }

 
    return(
        <div className="login-button">
            <GoogleLoginButton onClick={() => handleLogin()}/>
        </div>

    );
}

export default Login;

