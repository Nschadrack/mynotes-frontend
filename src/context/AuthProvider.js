import React, { useEffect, useState } from "react";
import AuthContext from './AuthContext';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

// const URL = "http://localhost:8000/";
const URL = "https://mynotes-apis.herokuapp.com/"

const AuthProvider = ({children}) =>{
    let navigate = useNavigate();
    let tokens = JSON.parse(localStorage.getItem("authTokens"));
    let [showLoginForm, setShowLoginForm] = useState(true);
    let [passwordsEqual, setPasswordsEqual] = useState(true);
    let [authTokens, setAuthTokens] = useState(tokens);
    let [notes, setNotes] = useState([]);
    let [user, setUser] = useState(tokens?jwt_decode(tokens.access): null);
    let [correctCredentials, setCorrectCredentials] = useState(true);


    // helper functions
    const handleSetShowLoginForm = (value) =>{
        setShowLoginForm(value);
        setPasswordsEqual(true);
    }

    const register = async(userpassed) =>{
        let response = await fetch(`${URL}users/`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userpassed)
        });

        if(response.status === 201){
            setShowLoginForm(true);
        }else{
            setShowLoginForm(false);
        }

    }

    const loginUser = async(userpassed) =>{
        let response = await fetch(`${URL}api/token/`,{
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(userpassed)
                            });
        if(response.status === 200){
            let data = await response.json();
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem("authTokens", JSON.stringify(data));
            navigate("/notes");
        }else{
            setCorrectCredentials(false);
        }
    }

    const updateToken = async() => {
        let response = await fetch(`${URL}api/token/refresh/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 'refresh': authTokens.refresh }),
        });
        
        if(response.status === 200){
            let data = await response.json();
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem("authTokens", JSON.stringify(data));
        }else{
            logoutUser();
        }
    }

    useEffect(() => {
      let timeToUpdate = 1000 * 60 * 4;
      let intervalTime = setInterval(() => {
        if (authTokens) {
          updateToken();
        }
      }, timeToUpdate);
      return () => clearInterval(intervalTime);
    }, [authTokens]);

    const logoutUser = () =>{
        setAuthTokens(null);
        setNotes([]);
        setUser(null);
        localStorage.removeItem("authTokens");
    }

    const handleRegister = (e) => {
        e.preventDefault();
        let userToRegister = {
            'first_name': e.target.firstName.value,
            'last_name': e.target.lastName.value,
            'username': e.target.username.value,
            'email': e.target.email.value,
            'password': e.target.password.value
        }

        if(userToRegister.password !== e.target.password2.value || userToRegister.password.length < 6){
            setPasswordsEqual(false);
            setShowLoginForm(false);
        }else{
            setShowLoginForm(true);
            register(userToRegister);
        }
    }

    const handleLogin = (e) => {
      e.preventDefault();
      let userToLogin = {
        username: e.target.username.value,
        password: e.target.password.value,
      };

        loginUser(userToLogin);    
    };

    // helper functions for notes

    const contextData = {
      user: user,
      notes: notes,
      setNotes: setNotes,
      passwordsEqual: passwordsEqual,
      showLoginForm: showLoginForm,
      authTokens: authTokens,
      correctCredentials: correctCredentials,
      handleSetShowLoginForm: handleSetShowLoginForm,
      handleRegister: handleRegister,
      handleLogin: handleLogin,
      logoutUser: logoutUser,
    };


    return (<AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>);
}



export default AuthProvider