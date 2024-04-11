import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { getUserStateSelector } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const user = useSelector(getUserStateSelector).userData;
  return <AppHeaderUI userName={'' || user?.name} />;
};
