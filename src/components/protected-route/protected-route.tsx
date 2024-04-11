import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getUserStateSelector } from '../../services/slices/userSlice';
import { Preloader } from '../ui/preloader';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({ onlyUnAuth }: ProtectedRouteProps) => {
  const { isAuthChecked, userData } = useSelector(getUserStateSelector);
  const user = userData;
  const location = useLocation();

  if (isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return <Outlet />;
};
