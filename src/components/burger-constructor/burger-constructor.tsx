import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import {
  getConstructorStateSelector,
  postOrderThunk,
  removeOrderModalData
} from '../../services/slices/constructorSlice';
import { AppDispatch } from 'src/services/store';
import { getUserStateSelector } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { constructorItems, orderModalData, loading } = useSelector(
    getConstructorStateSelector
  );

  const { isAuthenticated } = useSelector(getUserStateSelector);

  function prepareOrder(): string[] {
    let order: string[] = [];

    if (constructorItems.bun) {
      const ingredients: string[] = constructorItems.ingredients.map(
        (ingredient) => ingredient._id
      );

      order = [
        constructorItems.bun._id,
        ...ingredients,
        constructorItems.bun._id
      ];
    }

    return order;
  }

  const onOrderClick = () => {
    if (isAuthenticated) {
      const order = prepareOrder();
      dispatch(postOrderThunk(order));
    } else {
      navigate('/login');
    }
  };

  const closeOrderModal = () => {
    dispatch(removeOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={loading}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
