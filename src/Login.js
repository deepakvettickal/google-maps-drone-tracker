import React, {useState} from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import { useNavigate } from "react-router-dom";


import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCejK9_WsSEvlow6GVCRkGv3yRb9Ii1W8A",
  authDomain: "memories-2639d.firebaseapp.com",
  projectId: "memories-2639d",
  storageBucket: "memories-2639d.appspot.com",
  messagingSenderId: "949535918262",
  appId: "1:949535918262:web:5be335bf3e1e41b341be17"
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
        console.log('sign in error'. error.message);
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

