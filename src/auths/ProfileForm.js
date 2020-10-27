import React, { useState, useContext } from 'react';
import CurrUserContext from '../common/CurrUserContext.js'


/**Display signup Form
 * 
 * Props:
 * -initial form data
 * - signup (provides formData to parent to register user)
 * -TODO: setCurrUser Context?
 * 
 * State:
 * - formData
 * 
 * App -> Route (/signup) -> SignupForm
 */
function ProfileForm({ updateProfile }) {
  const currUser = useContext(CurrUserContext);

  let initialFormData = {
    firstName: currUser.firstName,
    lastName: currUser.lastName,
    email: currUser.email,
    password: ''
  }

  console.log("initial data", initialFormData)
  const [formData, setFormData] = useState(initialFormData);//Runs only once


  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData, [name]: value
    }));
  }

  console.log('formData', formData);
  async function handleSubmit(evt) {
    evt.preventDefault();
    await updateProfile(formData); //re-renders app.js, needs some time 
    setFormData({...formData, 'password' : ''});
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

        <button>Save changes</button>
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