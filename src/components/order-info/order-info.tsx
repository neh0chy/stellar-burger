import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsStateSelector } from '../../services/slices/ingredientsSlice';
import {
  getOrderByNumberSelector,
  getOrderByNumberThunk
} from '../../services/slices/orderByNumberSlice';
import { useParams } from 'react-router-dom';
import { AppDispatch } from 'src/services/store';

export const OrderInfo: FC = () => {
  const number = Number(useParams().id);
  const { orderData } = useSelector(getOrderByNumberSelector);
  const ingredients: TIngredient[] = useSelector(
    getIngredientsStateSelector
  ).ingredients;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getOrderByNumberThunk(number));
  }, [dispatch]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
