import React, {useState} from 'react'

function LoginForm(props){
  const {initialFromData, doLogin} = props
  const [formData, setFormData] = useState(initialFromData)
//TODO:history.push(/companies)
  function handleChange(evt){
    const [name, value] = evt.target
    setFormData(formData => ({
      ...formData, [name] : value
    }))
  }

  function handleSubmit(evt){
    evt.preventDefault()
    doLogin(formData)
    setFormData(initialFromData)

  }
  return (
    <form className="LoginForm" onSubmit={handleSubmit}>

      <div className="form-group">
        <input
            id="Login-username"
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
            id="Login-password"
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
  )
}

LoginForm.defaultProps ={
  username : "",
  password : ""
}