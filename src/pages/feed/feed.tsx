import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFeedStateSelector,
  getFeedThunk
} from '../../services/slices/feedSlice';
import { AppDispatch } from 'src/services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, loading } = useSelector(getFeedStateSelector);

  useEffect(() => {
    dispatch(getFeedThunk());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeedThunk())} />
  );
};
