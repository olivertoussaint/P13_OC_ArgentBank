// eslint-disable-next-line no-unused-vars
import React, { useState} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginFailed, loginSuccess } from '../../redux/actions/auth.actions'
import { isValidEmail, isValidPassword} from '../../utils/regex'

function Form() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!isValidEmail(email)) {
      setErrorMessage("Invalid email adress");
      return;
    }
    if (!isValidPassword(password)) {
      setErrorMessage("Invalid password");
      return;
    }
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({email, password}),
      });
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        const token = data.body.token
        dispatch(loginSuccess(token))
        sessionStorage.setItem("token", token)
        if (rememberMe) {
          localStorage.setItem("token", token)
        }
        navigate('/profile');
      } else {
        const error = "Incorrect email/password"
        dispatch(loginFailed(error));
      }
    }catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="sign-in-content flex flex-col gap-5 w-73 p-8 bg-white m-auto">
      <i className='fa-solid fa-circle-user text-1' />
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className='text-left'>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input 
          id='username'
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)} 
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input 
          id='password'
          type="password"
          value={password} 
          onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="input-remember">
          <input 
          id='remember-me'
          type="checkbox" 
          checked={rememberMe}
          onChange={(event) => setRememberMe(event.target.checked)}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button className="sign-in-button">
          Sign in
          </button>  
          {errorMessage && <p className='error-message'>{errorMessage}</p>}
      </form>
    </section>
  )
}

export default Form