import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


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
function SignupForm({ initialFormData, doSignup }) {
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
    await doSignup(formData);
    setFormData(initialFormData);

    history.push('/companies');
  }


  function renderFormInputs() {
    return(
      Object.keys(initialFormData).map(input => (
        <div className="form-group">
          <input
            id={`Signup-${input}`}
            name={input}
            className="form-control"
            placeholder={input}
            onChange={handleChange}
            value={formData[input]}
            aria-label={input}
          />
        </div>
      ))
    )
  }

  return (
    <form onSubmit={handleSubmit} className='SignupForm'>
      {renderFormInputs()}
      <button>Submit</button>
    </form>
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