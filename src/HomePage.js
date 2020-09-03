import React from 'react'
import {Link} from 'react-router-dom'

function HomePage(){

  return (
    <div className="HomePage">
      <div>
        <h1>Jobly</h1>
      </div>
      <div>
        <p>All the jobs in one, convenient place.</p>
      </div>
      <div>
        <Link className="btn btn-primary" to="/login"> Log in </Link>
        <Link className="btn btn-primary" to="/signup"> Sign Up</Link>
      </div>
    </div>
  )
}

export default HomePage