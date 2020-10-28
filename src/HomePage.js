import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import CurrentUserContext from './common/CurrentUserContext.js'

function HomePage() {
  const currentUser = useContext(CurrentUserContext);

  function renderWelcomeMsgOrButtons() {
    if (currentUser) {
      return (
        <>
          <h1>Welcome Back, {currentUser.username}</h1>
        </>
      )
    } else {
      return (
        <>
          <Link className="btn btn-primary" to="/login"> Log in </Link>
          <Link className="btn btn-primary" to="/signup"> Sign Up</Link>
        </>
      )
    }
  }

  return (
    <div className="HomePage">
      <div>
        <h1>Jobly</h1>
      </div>
      <div>
        <p>All the jobs in one, convenient place.</p>
      </div>
      <div>
          {renderWelcomeMsgOrButtons()}
      </div>
    </div>
  )
}

export default HomePage