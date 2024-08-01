// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/img/argentBankLogo.png'
import { logout } from '../../redux/actions/auth.actions'

function Header() {
    // Updates user data on header component from state redux
    const isConnected = useSelector((state) => state.auth.token)
    const firstName = useSelector((state) => state.user.userData.firstName)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(logout())
        sessionStorage.clear()
        localStorage.clear()
        navigate('/')
    }
  return (
    <header className='flex'>
        <h1 className="sr-only">Argent Bank</h1>
        <nav className='flex w-full items-center justify-between py-1.5 px-5'>
            <Link to='/' className='flex'>
            <img src={Logo} alt="Argent Bank logo" className='w-49' />
            </Link>
            {isConnected ? (
                <div className="connected">
                    <Link to='/profile'>
                    <i className='fa-solid fa-2x fa-circle-user' />
                    <p>{firstName}</p>
                    </Link>
                    <Link to='/' onClick={logoutHandler} className='flex'>
                    <i className='fa-solid fa-arrow-right-from-bracket' />
                    <p>Sign out</p>
                    </Link>
                </div>
            ) : (
                <div className="not-connected text-login">
                    <Link to='/login' className='flex mr-2 items-center font-bold'>
                    <i className='mr-2 text-lg fa-solid fa-circle-user'></i>
                    <p>Sign In</p>
                    </Link>
                </div>
            )}
        </nav>
    </header>
  )
}

export default Header