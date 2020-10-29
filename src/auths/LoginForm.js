import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AlertMessages from '../common/AlertMessages';

function LoginForm({login}) {
  const initialFromData = {
    username: "",
    password: ""
  }
  const [formData, setFormData] = useState(initialFromData)
  const [formErrors, setFormErrors] = useState([]);
  const history = useHistory();

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData, [name]: value
    }))
  }

  async function handleSubmit(evt) {
    evt.preventDefault()
    const result = await login(formData)
    if (result.success) {
      history.push('/companies');
    } else {
      setFormErrors(result.errors);
    }
  }
  return (
    <div>

      {formErrors.length
        ? <AlertMessages
            type='danger'
            message={formErrors} 
          />
        : null}
        
      <form className="LoginForm" onSubmit={handleSubmit}>

        <div className="form-group">
          <input
            id="login-username"
            name="username"
            className="form-control"
            placeholder="Username"
            onChange={handleChange}
            value={formData.username}
            aria-label="Username"
          />
        </div>

        <div className="form-group">
          <input
            id="login-password"
            name="password"
            className="form-control"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            aria-label="Password"
          />
        </div>

        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default LoginForm;