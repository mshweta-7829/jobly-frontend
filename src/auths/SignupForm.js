import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AlertMessages from '../common/AlertMessages';


/**Display signup Form
 * 
 * Props:
 * -initial form data
 * - signup (provides formData to parent to register user)
 * -TODO: setCurrentUser Context?
 * 
 * State:
 * - formData
 * 
 * App -> Route (/signup) -> SignupForm
 */
function SignupForm({ initialFormData, signup }) {
  console.log('******SignupForm intitialFormData:', initialFormData)
  console.log('******SignupForm signup:', signup);

  const [formErrors, setFormErrors] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const history = useHistory();

  function handleChange(evt) {
    const {name, value} = evt.target;
    setFormData(formData => ({
      ...formData, [name]: value
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const result = await signup(formData);

    if (result.success) {
      history.push('/companies')
    } else {
      setFormErrors(result.errors);
    }

    // try {
    //   await signup(formData);
    //   history.push('/companies');
    // } catch(err) {
    //   setFormErrors(err);
    // setFormData(initialFormData);
  }

  return (
    <div>
      {formErrors.length
        ? <AlertMessages type='danger' messages={formErrors} />
        : null}
        
      <form onSubmit={handleSubmit} className='SignupForm'>
        <div className='form-group row'>
        <div className="col-sm-2">
        <label>Username :</label>
        </div>
          <div className="col-sm-6">
            <input 
              className="form-control"
              onChange={handleChange}
              name='username'
              value={formData.username}
            />
          </div>
        </div>

        <div className="form-group row">
        <div className="col-sm-2">
          <label>Password :</label>
        </div>
          <div className="col-sm-6">
            <input
              id={`Profile-password`}
              name='password'
              type='password'
              className="form-control"
              onChange={handleChange}
              value={formData.password}
              aria-label='email'
            />
          </div>
        </div>

        <div className="form-group row">
        <div className="col-sm-2">
          <label htmlFor={`Profile-firstName`}>First Name :</label>
        </div>
          <div className="col-sm-6">
            <input
              id={`Profile-firstName`}
              name='firstName'
              className="form-control"
              onChange={handleChange}
              value={formData.firstName}
              aria-label='firstName'
            />
          </div>
        </div>

        <div className="form-group row">
        <div className="col-sm-2">
          <label htmlFor={`Profile-lastName`}>Last Name :</label>
        </div>
          <div className="col-sm-6">
            <input
              id={`Profile-lastName`}
              name='lastName'
              className="form-control"
              onChange={handleChange}
              value={formData.lastName}
              aria-label='lastName'
            />
          </div>
        </div>

        <div className="form-group row">
        <div className="col-sm-2">
          <label htmlFor={`Profile-email`}>Email :</label>
        </div>
          <div className="col-sm-6">
            <input
              id={`Profile-email`}
              name='email'
              className="form-control"
              onChange={handleChange}
              value={formData.email}
              aria-label='email'
            />
          </div>
        </div>

        <button className="btn btn-primary">Save changes</button>
      </form>
    </div>
  )
}

SignupForm.defaultProps = {
  initialFormData: {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  }
}

export default SignupForm;