import React, { useState } from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import Routes from './Routes'
import NavBar from './NavBar'
import CurrUserContext from './common/CurrUserContext.js'

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
//TODO :make sure if we need to store all user data
function App() {
  const [currUser, setCurrUser] = useState(null)

  function doLogin(userData) {
    setCurrUser(userData)
  }

  function doLogout() {
    setCurrUser(null)
  }

  return (
    <div className="App">
      <BrowserRouter>
      <CurrUserContext.Provider value = {currUser}>
        <NavBar doLogout ={doLogout} />
         <Routes /> 
      </CurrUserContext.Provider>
      </BrowserRouter>
    </div>
  );
}


export default App;
