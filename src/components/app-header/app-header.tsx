import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUserStateSelector } from '../../services/slices/userSlice/userSlice';

export const AppHeader: FC = () => {
  const user = useSelector(getUserStateSelector).userData;
  return <AppHeaderUI userName={'' || user?.name} />;
};
