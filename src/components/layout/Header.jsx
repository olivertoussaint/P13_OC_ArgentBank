import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/img/argentBankLogo.png";
import { logout } from "../../redux/slices/authSlice";
import DarkModeToggle from "../DarkModeToggle";
import { useDispatch } from "react-redux";

function Header() {
  const isConnected = useSelector((state) => state.auth.isAuthenticated);
  const firstName = useSelector(
    (state) => state.auth.user?.firstName || "Tony"
  );
  const lastName = useSelector((state) => state.auth.user?.lastName || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className=" sticky top-0 z-50 flex">
      <h1 className="sr-only">Argent Bank</h1>
      <nav className="flex w-full items-center justify-between py-1.5 px-5  bg-white dark:bg-dark">
        <Link to="/" className="flex">
          <img src={Logo} alt="Argent Bank logo" className=" w-24 sm:w-49" />
        </Link>
        {isConnected ? (
          <div className="connected flex items-center">
            <Link to='/profile' className='flex items-center'>
    <i className='dark:text-white fa-solid fa-circle-user text-lg md:text-3xl' />
    <p className='dark:text-white ml-2'>{firstName} {lastName}</p>
</Link>


            <Link
              to="/"
              onClick={logoutHandler}
              className="flex items-center ml-4"
            >
              <i className="dark:text-white fa-solid fa-arrow-right-from-bracket" />
              <p className="dark:text-white ml-2 hidden sm:inline">Sign out</p>
            </Link>
          </div>
        ) : (
          <div className="not-connected text-login">
            <Link to="/login" className="flex mr-2 items-center font-bold">
              <i className="dark:text-white mr-2 text-lg fa-solid fa-circle-user"></i>
              <p className="dark:text-white">Sign In</p>
            </Link>
          </div>
        )}
      </nav>
      <DarkModeToggle />
    </header>
  );
}

export default Header;
