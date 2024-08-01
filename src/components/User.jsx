
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUsername } from '../redux/actions/user.actions'
import { isValidName } from '../utils/regex'

function User() {
  const token = useSelector((state) => state.auth.token)
  const userData = useSelector((state) => state.user.userData)
  const [display, setDisplay] = useState(true)
  const [username, setUsername] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const dispatch = useDispatch()

  const handleSubmitUsername = async (event) => {
    event.preventDefault();
    if (!isValidName(username)) {
        setErrorMessage("Invalid username");
        return;
    } else {
        setErrorMessage("");
    }
    try {
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({username}),
        });
        if (response.ok) {
            const data = await response.json();
            const username = data.body.username;
            console.log(data) 
            
            dispatch(updateUsername(username));
            setDisplay(!display);
        } else {
            console.log("Invalid Fields")
        }

    } catch (error) {
        console.error(error);
    }
}

  return (
    <div className='header'>
        { display ? 
                <div>
                    <h2>Welcome back 
                        <br />
                        {userData.firstname} {userData.lastname} !
                    </h2>
                    <button className="edit-button" onClick={() => setDisplay(!display)}>Edit Name</button>
                </div>
                :
                <div>
                    <h2>Edit user info</h2>
                    <form>
                        <div className="edit-input">
                            <label htmlFor="username">User name:</label>
                            <input
                                type="text"
                                id="username"
                                defaultValue={userData.username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="edit-input">
                            <label htmlFor="firstname">First name:</label>
                            <input
                                type="text"
                                id="firstname" 
                                defaultValue={userData.firstname}
                                disabled={true}
                            />
                        </div>
                        <div className="edit-input">
                            <label htmlFor="lastname">Last name:</label>
                            <input
                                type="text"
                                id="lastname" 
                                defaultValue={userData.lastname}
                                disabled={true}
                            />
                        </div>
                        <div className="buttons">
                            <button className="edit-username-button" onClick={handleSubmitUsername}>Save</button>
                            <button className="edit-username-button" onClick={() => setDisplay(!display)}>Cancel</button>
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </form>
                    </div>
}
    </div>
  )
}

export default User