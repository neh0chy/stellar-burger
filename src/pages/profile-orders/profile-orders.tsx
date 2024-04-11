import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getUserStateSelector } from '../../services/slices/userSlice';

export const ProfileOrders: FC = () => {
  const { userOrders } = useSelector(getUserStateSelector);

  const orders: TOrder[] = userOrders;

  return <ProfileOrdersUI orders={orders} />;
};
