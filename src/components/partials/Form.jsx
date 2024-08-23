import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginFailed, loginSuccess } from '../../redux/actions/auth.actions'
import { isValidEmail, isValidPassword } from '../../utils/regex';

function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrorMessage(''); // Réinitialiser le message d'erreur lors du changement d'email
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrorMessage(''); // Réinitialiser le message d'erreur lors du changement de mot de passe
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setErrorMessage('Invalid email address');
      return;
    }

    if (!isValidPassword(password)) {
      setErrorMessage('Invalid password');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('API Response', data)
        const token = data.body.token;
        const firstName = data.body.firstName

        dispatch(loginSuccess(token, firstName));
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('firstName', firstName)
        if (rememberMe) {
          localStorage.setItem('token', token);
          localStorage.setItem('firstName', firstName);
        }
        navigate('/profile');
      } else {
        const error = 'Incorrect email/password';
        setErrorMessage(error);
        dispatch(loginFailed(error));
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      console.error('Login error:', error);
    }
  };

  return (
    <section className="sign-in-content flex flex-col gap-5 w-73 p-8 bg-white m-auto">
      <i className="fa-solid fa-circle-user text-1" />
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="text-left">
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="input-remember">
          <input
            id="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button type="submit" className="bg-regul-green mt-4 w-full block text-white text-1 p-.625rem font-bold hover:bg-lime-600 hover:text-black">
          Sign in
        </button>
        {errorMessage && (
          <p className="error-message text-pink-500 mt-2">{errorMessage}</p>
        )}
      </form>
    </section>
  );
}

export default Form;
