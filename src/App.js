import React, { useState } from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import Routes from './Routes'
import NavBar from './NavBar'

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
  const [currUser, setCurrUser] = useState({})

  function addCurrUser(userData) {
    setCurrUser(userData)
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar currUser={currUser} />
        <Routes addCurrUser={addCurrUser} currUser={currUser} />
      </BrowserRouter>
    </div>
  );
}


export default App;
