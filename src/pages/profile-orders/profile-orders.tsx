import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getUserOrdersThunk,
  getUserStateSelector
} from '../../services/slices/userSlice/userSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getUserStateSelector).userOrders;

  useEffect(() => {
    dispatch(getUserOrdersThunk());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
