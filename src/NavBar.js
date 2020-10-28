import React, {useContext} from 'react';
import { NavLink } from "react-router-dom";
import './NavBar.css'
import CurrentUserContext from "./common/CurrentUserContext";

/**Renders Nav Links based on whether user is loggedin or not
 * 
 * Accepts props:
 * - currentUser -> details about currentUser
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
function NavBar({logout}) {
  const  currentUser = useContext(CurrentUserContext)

  function showLoggedinOrSignupNavs() {
    if (!currentUser) {
      return (
        <>
          <NavLink to="/login">login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
        </>
      )
    } else {
      return (
        <>
          <NavLink to="/companies">Companies</NavLink>
          <NavLink to="/jobs">Jobs</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink onClick={logout} to="/">Log out {currentUser.username}</NavLink>
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