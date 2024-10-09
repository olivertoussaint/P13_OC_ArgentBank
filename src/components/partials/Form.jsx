import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/slices/authSlice';
import { isValidEmail, isValidPassword } from '../../utils/regex';

function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { status, error } = useSelector((state) => state.auth);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      alert('Invalid email address');
      return;
    }

    if (!isValidPassword(password)) {
      alert('Invalid password');
      return;
    }

    const resultAction = await dispatch(login({ email, password }));
    console.log(login.fulfilled)
    console.log(login.fulfilled.match(resultAction))
    console.log(resultAction)
    if (login.fulfilled.match(resultAction)) {
      const { token } = resultAction.payload;

      sessionStorage.setItem('token', token);
      if (rememberMe) {
        localStorage.setItem('token', token);
      }

      navigate('/profile');
    }
  };

  return (
    <section className="sign-in-content shadow-lg flex flex-col gap-5 w-73 p-8 bg-white m-auto">
      <i className="fa-solid fa-circle-user text-1" />
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="text-left">
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="w-full px-4 py-2 border border-violet-300 text-gray-700 placeholder-violet-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
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
            className="w-full px-4 py-2 border border-violet-300 text-gray-700 placeholder-violet-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
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
        <button type="submit" className="border border-violet-300 mt-4 w-full block text-violet-600 text-1 p-.625rem font-bold hover:border-violet-600 hover:text-lg">
          Sign in
        </button>
        {status === 'failed' && (
          <p className="error-message text-pink-500 mt-2">{error}</p>
        )}
      </form>
    </section>
  );
}

export default Form;
