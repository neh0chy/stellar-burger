import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from 'react-redux';
import { getUserLogout } from '../../services/slices/userSlice';
import { AppDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(getUserLogout());
    navigate('/');
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
