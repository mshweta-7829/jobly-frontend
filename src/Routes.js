import React from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import HomePage from './HomePage.js';
import CompanyList from './companies/CompanyList.js';
import CompanyDetail from './companies/CompanyDetail.js';
import JobCardList from './jobs/JobCardList.js';
import LoginForm from './auths/LoginForm.js'
import SignupForm from './auths/SignupForm.js'
import ProfileForm from './auths/ProfileForm.js'

/** Defines all the routes 
 *  and redirects homepage route if nothing matches 
 * 
 * Accepts props :
 *   - currentUser -> details about currentUser
 *   - addCurrUser function to add currentUser if not set.
 * 
 * App -> Routes -> {
 *                    HomePage, CompanyList, 
 *                    CompanyDetail, JobList, 
 *                    LoginForm, SignupForm, 
 *                    ProfileForm
 *                  }
 * */
function Routes({ signup, login, updateProfile }) {

  return (
    <div className="Routes">
      <Switch>
      <Route exact path="/" >
        <HomePage  />
      </Route>
      <Route exact path="/companies" >
        <CompanyList  />
      </Route>
      <Route exact path="/companies/:companyName" >
        <CompanyDetail />
      </Route>
      <Route exact path="/jobs" >
        <JobCardList />
      </Route>
      <Route exact path="/login" >
        <LoginForm login={login} />
      </Route>
      <Route exact path="/signup" >
        <SignupForm signup={signup}/>
      </Route>
      <Route exact path="/profile" >
        <ProfileForm updateProfile={updateProfile} />
      </Route>
      <Redirect to="/" />
      </Switch>
    </div>
  )
}

export default Routes