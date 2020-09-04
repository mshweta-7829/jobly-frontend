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

  // runs after first re-render and when token changes
  useEffect(function fetchUserOnTokenChange() {
    async function fetchUser() {
      try {
        const payload = decode(token);
        console.log("payload", payload)
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

  async function doSignup(formData) {
    try {
      const token = await JoblyApi.registerUser(formData);
      JoblyApi.token = token;
      setToken(JoblyApi.token);
      localStorage.setItem("token", JoblyApi.token);
    } catch (err) {
      console.log('Error!', err);
    }
  }

  async function doLogin(formData) {
    try {
      const token = await JoblyApi.loginUser(formData);
      JoblyApi.token = token;
      setToken(JoblyApi.token);
      localStorage.setItem("token", JoblyApi.token);
    } catch (err) {
      console.log('Error!', err);
    }
  }

  async function doUpdateProfile(formData) {
    const user = await JoblyApi.updateUser(currUser.username, formData)
    setCurrUser(user);
  }

  function doLogout() {
    localStorage.removeItem('token')
    setToken(null)
    setCurrUser(null)
  }

  if (token && !currUser) return <h2>Waiting</h2>

  return (
    <div className="App container">
      <BrowserRouter>
        <CurrUserContext.Provider value={currUser}>
          <NavBar doLogout={doLogout} />
          <Routes
            doSignup={doSignup}
            doLogin={doLogin}
            doUpdateProfile={doUpdateProfile}
          />
        </CurrUserContext.Provider>
      </BrowserRouter>
    </div>
  );
}


export default App;
