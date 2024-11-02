import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from './Spinner'; // Par exemple, ton composant Spinner

const PrivateRoute = ({ element }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const status = useSelector((state) => state.auth.status); // Ex : statut 'loading', 'idle', 'succeeded', etc.
  const location = useLocation();

  // Si l'authentification est en cours de vérification, afficher un loader
  if (status === 'loading') {
    return <Spinner />;
  }

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default PrivateRoute;
