import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../redux/slices/userSlice';
import { updateProfile } from '../redux/slices/authSlice';
import Account from '../components/Account';
import AccountCardData from '../data/AccountCardData.json';
import Spinner from '../components/Spinner';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const status = useSelector((state) => state.user.status);
  const token = useSelector((state) => state.auth.token);

  const [firstName, setFirstName] = useState('Tony');
  const [lastName, setLastName] = useState('Jarvis');
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || 'Tony');
      setLastName(user.lastName || 'Jarvis');
      setEditFirstName(user.firstName || '');
      setEditLastName(user.lastName || '');
    }
  }, [user]);

  const handleFirstNameChange = (event) => {
    setEditFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setEditLastName(event.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setEditFirstName(firstName);
    setEditLastName(lastName);
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    if (token) {
      setFirstName(editFirstName);
      setLastName(editLastName);
      dispatch(updateProfile({ token, firstName: editFirstName, lastName: editLastName }));
      setIsEditing(false);
    }
  };

  if (status === 'loading') {
    return <Spinner />;
  }

  if (status === 'failed') {
    return <p>Error loading profile. Please try again later.</p>;
  }

  return (
    <div className="profile-container">
      <main className="bg-gray-200 dark:bg-dark min-h-150">
        <h2 className="text-2 pt-6 dark:text-white">
          Welcome back <br /> {firstName} {lastName}!
        </h2>

        <div className="profile-edit-section mt-6">
          {isEditing ? (
            <div className="edit-input flex flex-col gap-4">
              <div className="input-group">
                <label htmlFor="firstName" className="block dark:text-white mb-1">
                  First Name:
                </label>
                <input
                  type="text"
                  placeholder={firstName}
                  id="firstName"
                  value={editFirstName}
                  onChange={handleFirstNameChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
              <div className="input-group">
                <label htmlFor="lastName" className="block dark:text-white mb-1">
                  Last Name:
                </label>
                <input
                  type="text"
                  placeholder={lastName}
                  id="lastName"
                  value={editLastName}
                  onChange={handleLastNameChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
              <div className="buttons flex gap-4 mt-4">
                <button
                  onClick={handleSaveClick}
                  className="border border-violet-500 bg-white text-violet-500 px-4 py-2 rounded-md shadow hover:text-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-300"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelClick}
                  className="border border-violet-500 bg-white text-violet-500 px-4 py-2 rounded-md shadow hover:text-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="display-info">
              <button
                onClick={handleEditClick}
                className="border border-violet-500 text-violet-500 p-2 mt-5 rounded-md shadow-lg shadow-violet-300/100 hover:shadow-lg hover:shadow-violet-400/90 focus:outline-none focus:ring-2 focus:ring-violet-300"
              >
                Edit Name
              </button>
            </div>
          )}
        </div>

        <div className="account-section mt-6">
          {AccountCardData.map((account) => (
            <Account
              key={account.id}
              id={account.id}
              title={account.title}
              amount={account.amount}
              description={account.description}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Profile;
