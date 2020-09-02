import React from 'react';
import { Route, Redirect } from "react-router-dom";
import HomePage from './HomePage.js'
import CompanyList from './CompanyList.js'
import CompanyDetail from './CompanyDetail.js'
import JobList from './HomePage.js'
import LoginForm from './LoginForm.js'
import SignupForm from './SignupForm.js'
import ProfileForm from './ProfileForm.js'

/** Defines all the routes 
 *  and redirects homepage route if nothing matches 
 * 
 * Accepts props :
 *   - currUser -> details about currUser
 *   - addCurrUser function to add currUser if not set.
 * 
 * App -> Routes -> {
 *                    HomePage, CompanyList, 
 *                    CompanyDetail, JobList, 
 *                    LoginForm, SignupForm, 
 *                    ProfileForm
 *                  }
 * */
function Routes(props) {
  const { currUser, addCurrUser } = props

  return (
    <div className="Routes">
      <Route exact path="/" >
        <HomePage currUser={currUser} />
      </Route>
      <Route exact path="/companies" >
        <CompanyList currUser={currUser} />
      </Route>
      <Route exact path="/companies/:companyName" >
        <CompanyDetail currUser={currUser} />
      </Route>
      <Route exact path="/jobs" >
        <JobList currUser={currUser} />
      </Route>
      <Route exact path="/login" >
        <LoginForm addCurrUser={addCurrUser} />
      </Route>
      <Route exact path="/signup" >
        <SignupForm addCurrUser={addCurrUser} />
      </Route>
      <Route exact path="/profile" >
        <ProfileForm currUser={currUser} addCurrUser={addCurrUser} />
      </Route>
      <Redirect to="/" />
    </div>
  )
}

export default Routes