import React, { useState, useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import decode from 'jwt-decode';
import Routes from './routes/Routes';
import NavBar from './nav/NavBar';
import CurrentUserContext from './auths/CurrentUserContext';
import JoblyApi from './apis/JoblyAPI';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

// Key name for storing token in localStorage in case page refreshes
export const TOKEN_STORAGE_ID = "jobly-token";

/** Jobly App
 * 
 * State :
 *  - currentUser: 
 *      User obj from API. Once retrieved, it is stored in context (CurrentUserContext). 
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
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [infoLoaded, setInfoLoaded] = useState(false);
  // const [token, setToken] = useState(storedToken || null);
  // const storedToken = localStorage.getItem('token')


  // runs after first render and when token changes
  useEffect(function fetchUserOnTokenChange() {
    async function fetchUser() {
      if (token) {
        try {
          const payload = decode(token);
          JoblyApi.token = token;
          const user = await JoblyApi.getUser(payload.username);
          setCurrentUser(user);
        } catch (err) {
          console.error('Error loading the user!', err)
          setCurrentUser(null);
        }
      }
      // loading spinner will not render
      setInfoLoaded(true);
    }

    // sets infoLoaded to false - this renders the loading spinner as fetchUser runs
    // once fetchUser finishes running, the loading spinner will not be present after
    // the rerender triggered by fetchUser
    setInfoLoaded(false);
    fetchUser();
  }, [token]);

  /** Signs user up
   * 
   * Upon signup, the user's token is saved both to the JoblyAPI class and 
   * local storage (see the useEffect above). Therefore, the user is treated as being
   * logged in on sign up is successful 
   */
  async function signup(signupData) {
    try {
      const token = await JoblyApi.registerUser(signupData);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error('Signup Unsuccessful!', err);
      return { success: false, err};
    }
  }

  /**Logs user in
   * 
   * Upon login, user's token is saved both to the JoblyAPI class
   * and local storage
   */
  async function login(loginData) {
    try {
      const token = await JoblyApi.loginUser(loginData);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error('Login Unsuccessful!', err);
      return { success: false, err};
    }
  }

  /**Updates a user's profile */
  async function updateProfile(updateData) {
    const user = await JoblyApi.updateUser(currentUser.username, updateData)
    setCurrentUser(user);
  }

  function logout() {
    setToken(null);
    setCurrentUser(null);
  }

  if (!infoLoaded) return <h2>Waiting</h2>

  return (
      <BrowserRouter>
        <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
          <NavBar logout={logout} />
          <Routes
            signup={signup}
            login={login}
            updateProfile={updateProfile}
          />
        </CurrentUserContext.Provider>
      </BrowserRouter>
  );
}


export default App;