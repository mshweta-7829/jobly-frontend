import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CurrUserContext from '../common/CurrUserContext.js'


/**Display Signup Form
 * 
 * Props:
 * -initial form data
 * - doSignup (provides formData to parent to register user)
 * -TODO: setCurrUser Context?
 * 
 * State:
 * - formData
 * 
 * App -> Route (/signup) -> SignupForm
 */
function ProfileForm({ doUpdateProfile }) {
  const currUser = useContext(CurrUserContext);
  let initialFormData = {};
  
  function updateInitialFormData() {
    initialFormData = {
      firstName: currUser.firstName,
      lastName: currUser.lastName,
      email: currUser.email,
      password: ''
    }
  }
  updateInitialFormData();
  const [formData, setFormData] = useState(initialFormData);

  console.log('formData', formData);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData, [name]: value
    }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    doUpdateProfile(formData);
    updateInitialFormData();
    setFormData(initialFormData);
  }


  function renderFormInputs() {
    return (
      <form onSubmit={handleSubmit} className='SignupForm'>
        <div className='form-group'>
          <label>Username</label>
          <p>{currUser.username}</p>
        </div>

        <div className="form-group">
          <label htmlFor={`Profile-firstName`}>First Name</label>
          <input
            id={`Profile-firstName`}
            name='firstName'
            className="form-control"
            onChange={handleChange}
            value={formData.firstName}
            aria-label='firstName'
          />
        </div>

        <div className="form-group">
          <label htmlFor={`Profile-lastName`}>Last Name</label>
          <input
            id={`Profile-lastName`}
            name='lastName'
            className="form-control"
            onChange={handleChange}
            value={formData.lastName}
            aria-label='lastName'
          />
        </div>

        <div className="form-group">
          <label htmlFor={`Profile-email`}>Email</label>
          <input
            id={`Profile-email`}
            name='email'
            className="form-control"
            onChange={handleChange}
            value={formData.email}
            aria-label='email'
          />
        </div>

        <div className="form-group">
          <label htmlFor={`Profile-password`}>Confirm Password to Make Changes</label>
          <input
            id={`Profile-password`}
            name='password'
            className="form-control"
            onChange={handleChange}
            value={formData.password}
            aria-label='email'
          />
        </div>

        <button>Submit</button>
      </form>

    )
  }
  return (
    <div>
      {renderFormInputs()}
    </div>
  )
}



export default ProfileForm;