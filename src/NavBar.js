import React from 'react';
import { NavLink } from "react-router-dom";
import './NavBar.css'

/**Renders Nav Links based on whether user is loggedin or not
 * 
 * Accepts props:
 * - currUser -> details about currUser
 * 
 * If user is loggedIn, renders link to:
 *    -Companies
 *    -Jobs
 *    -Profile
 *    -Logout
 * 
 * Else, renders link to :
 *    -signup
 *    -login
 *
 * And always renders link to:
 *     -jobly
 * 
 * App -> NavBar -> (links)
 */
function NavBar(props) {
  const { currUser } = props

  function showLoggedinOrSignupNavs() {
    if (Object.keys(currUser).length === 0) {
      return (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
        </>
      )
    } else {
      return (
        <>
          <NavLink to="/companies">Companies</NavLink>
          <NavLink to="/jobs">Jobs</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/jobs">Log out {currUser.username}</NavLink>
        </>
      )
    }
  }

  return (
    <div className="NavBar">
      <NavLink exact to="/">Jobly</NavLink>
      {showLoggedinOrSignupNavs()}
    </div>
  )
}

export default NavBar