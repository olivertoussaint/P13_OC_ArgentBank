// eslint-disable-next-line no-unused-vars
import React, { useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userProfile } from '../../redux/actions/user.actions'
import User from '../../components/User'
import Account from '../../components/Account'
import AccountCardData from '../../data/AccountCardData.json'

function UserProfile () {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
      if (token) {
          const userData = async () => {
              try {
                  const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${token}`,
                      },
                  });
                  if (response.ok) {
                      const data = await response.json();
                          console.log(data) 
                      
                      const userData = {
                          createdAt: data.body.createdAt,
                          updatedAt: data.body.updatedAt,
                          id: data.body.id,
                          email: data.body.email,
                          firstname: data.body.firstName,
                          lastname: data.body.lastName,
                          username: data.body.userName
                      }
                      dispatch(userProfile(userData));
                  } else {
                      console.log("error while retrieving profile");
                  }
              } catch (error) {
                  console.error(error);
              }
          };
          userData();
      }
  }, [dispatch, token]);

  return (
      <div className='profile-page'>
          <main className='bg-dark'>
              < User />
              {AccountCardData.map((data) => (
                  <Account 
                      key={data.id}
                      title={data.title}
                      amount={data.amount}
                      description={data.description}
                  />
              ))}
          </main>
      </div>
  )
}

export default UserProfile