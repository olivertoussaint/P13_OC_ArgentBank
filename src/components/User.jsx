import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUsername } from '../redux/actions/user.actions';
import { isValidName } from '../utils/regex';

function User() {
  const token = useSelector((state) => state.auth.token);
  const userData = useSelector((state) => state.user.userData);
  const [display, setDisplay] = useState(true);
  const [username, setUsername] = useState(userData.username || '');
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    // Update username state when userData changes (if necessary)
    setUsername(userData.username);
  }, [userData]);

  const handleSubmitUsername = async (event) => {
    event.preventDefault();

    if (!isValidName(username)) {
      setErrorMessage('Invalid username');
      return;
    }

    setErrorMessage('');

    try {
      const response = await fetch(
        'http://localhost:3001/api/v1/user/profile',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ username }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const updatedUsername = data.body.username;
        console.log(data);

        dispatch(updateUsername(updatedUsername));
        setDisplay(!display);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Invalid Fields');
        console.error('Error:', errorData.message || 'Invalid Fields');
      }
    } catch (error) {
      setErrorMessage('Network error');
      console.error('Network error:', error);
    }
  };

  return (
    <div className="header text-white mb-8">
      {display ? (
        <div>
          <h2 className="text-2 pt-6 text-white">
            Welcome back
            <br />
            {userData.firstname} {userData.lastname}
          </h2>
          <button
            className="bg-regul-green p-.625rem mt-5"
            onClick={() => setDisplay(!display)}
          >
            Edit Name
          </button>
        </div>
      ) : (
        <div>
          <h2>Edit user info</h2>
          <form>
            <div className="edit-input">
              <label htmlFor="username">User name:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="edit-input">
              <label htmlFor="firstname">First name:</label>
              <input
                type="text"
                id="firstname"
                value={userData.firstname}
                disabled={true}
              />
            </div>
            <div className="edit-input">
              <label htmlFor="lastname">Last name:</label>
              <input
                type="text"
                id="lastname"
                value={userData.lastname}
                disabled={true}
              />
            </div>
            <div className="buttons">
              <button
                className="edit-username-button bg-regul-green p-.625rem"
                onClick={handleSubmitUsername}
                disabled={!username || username === userData.username}
              >
                Save
              </button>
              <button
                className="edit-username-button bg-regul-green p-.625rem"
                onClick={() => setDisplay(!display)}
              >
                Cancel
              </button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
      )}
    </div>
  );
}

export default User;
