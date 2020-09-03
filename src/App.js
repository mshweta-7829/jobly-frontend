import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import Routes from './Routes'
import NavBar from './NavBar'
import CurrUserContext from './common/CurrUserContext.js'
import JoblyApi from './apis/JoblyAPI';
import decode from 'jwt-decode';

/** Renders NavBar and Routes
 * 
 * state : currUser (initially empty {})
 *         once user is loggedin, sets to 
 *          currUser = {
 *                      username : "testUser",
 *                      firstName : "test",
 *                      lastName : "User",
 *                      email : "test@g.com"
 *                      }
*/
function App() {
  const [currUser, setCurrUser] = useState(null);
  const storedToken = localStorage.getItem('token')
  const [token, setToken] = useState(storedToken || null);
  const [userRegData, setUserRegData] = useState(null);
  const [userLoginData, setUserLoginData] = useState(null);

  // Get token on registration
  useEffect(function fetchTokenOnRegister() {
    async function fetchToken() {
      try{
        const token = await JoblyApi.registerUser(userRegData);
        JoblyApi.token = token;
        setToken(JoblyApi.token);
        localStorage.setItem("token", JoblyApi.token);
      } catch (err) {
        console.log('Error!', err);
      }
    }
    if (userRegData ){
      fetchToken();
    }
  }, [userRegData]);

  // Get token on Login
  useEffect(function fetchTokenOnLogin() {
    async function fetchToken() {
      try{
        const token = await JoblyApi.loginUser(userLoginData);
        JoblyApi.token = token;
        setToken(JoblyApi.token);
        localStorage.setItem("token", JoblyApi.token);
      } catch (err) {
        console.log('Error!', err);
      }
    }
    if (userLoginData ){
      fetchToken();
    }
  }, [userLoginData]);

  // Set currUser upon login/registration
  useEffect(function fetchUserOnTokenChange() {
    async function fetchUser() {
      try{
        JoblyApi.token = token;
        const payload = decode(token);
        console.log("payload", payload)
        const user = await JoblyApi.getUser(payload.username);
        setCurrUser(user);
      } catch(err) {
        console.log('Error!', err)
      }
    }
    if(token){
      fetchUser();
    }
  }, [token]);

  function doSignup(formData){
    setUserRegData(formData);
  }

  function doLogin(formData) {
    setUserLoginData(formData)
  }

  function doLogout() {
    localStorage.removeItem('token')
    setToken(null)
    setCurrUser(null)
  }

  return (
    <div className="App container">
      <BrowserRouter>
      <CurrUserContext.Provider value = {currUser}>
        <NavBar doLogout ={doLogout} />
        <Routes doSignup={doSignup} doLogin={doLogin}/> 
      </CurrUserContext.Provider>
      </BrowserRouter>
    </div>
  );
}


export default App;
