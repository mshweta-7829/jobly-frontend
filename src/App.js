import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import Routes from './Routes'
import NavBar from './NavBar'
import CurrUserContext from './common/CurrUserContext.js'
import JoblyApi from './apis/JoblyAPI';
import decode from 'jwt-decode';

// Key name for storing token in localStorage in case page refreshes
export const TOKEN_STORAGE_ID = "jobly-token";

/** Jobly App
 * 
 * State :
 *  - currUser: 
 *      User obj from API. Once retrieved, it is stored in context. 
 *      Read by other components to see if user is logged in
 *        { username, firstName, lastName, isAdmin, jobs }
 *          where jobs is { id, title, companyHandle, companyName, state }
 * 
 *  - token: 
 *      Authentication JWT received when a user logs in / signs up
 *      Required for most API calls. When a user logs in or signs up, token is saved
 *      to local storage in case the page refreshes
 * 
 *  - infoLoaded:
 *      Manages the loading spinner
 * 
 * App -> { NavBar, Routes }
*/
function App() {
  const [currUser, setCurrUser] = useState(null);
  const [token, setToken] = useState(storedToken || null);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const storedToken = localStorage.getItem('token')


  // runs after first render and when token changes
  useEffect(function fetchUserOnTokenChange() {
    async function fetchUser() {
      try {
        const payload = decode(token);
        const user = await JoblyApi.getUser(payload.username);
        setCurrUser(user);
      } catch (err) {
        console.log('Error!', err)
      }
    }
    if (token) {
      fetchUser();
    }
  }, [token]);

  async function signup(formData) {
    try {
      const token = await JoblyApi.registerUser(formData);
      JoblyApi.token = token;
      setToken(JoblyApi.token);
      localStorage.setItem(TOKEN_STORAGE_ID, JoblyApi.token);
    } catch (err) {
      console.log('Error!', err);
    }
  }

  async function login(formData) {
    try {
      const token = await JoblyApi.loginUser(formData);
      JoblyApi.token = token;
      setToken(JoblyApi.token);
      localStorage.setItem("token", JoblyApi.token);
    } catch (err) {
      console.log('Error!', err);
    }
  }

  async function updateProfile(formData) {
    const user = await JoblyApi.updateUser(currUser.username, formData)
    setCurrUser(user);
  }

  function logout() {
    localStorage.removeItem('token')
    setToken(null)
    setCurrUser(null)
  }

  if (token && !currUser) return <h2>Waiting</h2>

  return (
    <div className="App container">
      <BrowserRouter>
        <CurrUserContext.Provider value={currUser}>
          <NavBar logout={logout} />
          <Routes
            signup={signup}
            login={login}
            updateProfile={updateProfile}
          />
        </CurrUserContext.Provider>
      </BrowserRouter>
    </div>
  );
}


export default App;
