import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/img/argentBankLogo.png';
import { logout } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

function Header() {
    const isConnected = useSelector((state) => state.auth.isAuthenticated);
    const firstName = useSelector((state) => state.auth.user?.firstName || 'User');
    const lastName = useSelector((state) => state.auth.user?.lastName || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logout());
        sessionStorage.clear();
        localStorage.clear();
        navigate('/');
    };

    return (
        <header className='flex'>
            <h1 className="sr-only">Argent Bank</h1>
            <nav className='flex w-full items-center justify-between py-1.5 px-5'>
                <Link to='/' className='flex'>
                    <img src={Logo} alt="Argent Bank logo" className='w-49' />
                </Link>
                {isConnected ? (
                    <div className="connected flex items-center">
                        <Link to='/profile' className='flex items-center'>
                            <i className='fa-solid fa-2x fa-circle-user' />
                            <p className='ml-2'>{firstName} {lastName}</p>
                        </Link>
                        <Link to='/' onClick={logoutHandler} className='flex items-center ml-4'>
                            <i className='fa-solid fa-arrow-right-from-bracket' />
                            <p className='ml-2'>Sign out</p>
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
    );
}

export default Header;
