import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getIngredientsThunk } from '../../services/slices/ingredientsSlice';
import { AppDispatch } from '../../services/store';
import {
  getUserOrdersThunk,
  getUserThunk
} from '../../services/slices/userSlice';

const App = () => {
  const location = useLocation();
  const background = location.state?.background;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getIngredientsThunk());
    dispatch(getUserOrdersThunk());
    dispatch(getUserThunk());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:id' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='*' element={<NotFound404 />} />

        {/* Обертка защищенным роутом для всех роутов сразу */}
        <Route element={<ProtectedRoute onlyUnAuth />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>

        {/* Обертка защищенным роутом для всех роутов сразу */}
        <Route element={<ProtectedRoute onlyUnAuth={false} />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
          <Route path='/profile/orders/:number' element={<OrderInfo />} />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/feed/:id'
            element={
              <Modal
                title={'Детали ингредиента'}
                onClose={() => {
                  history.back();
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title={''}
                onClose={() => {
                  history.back();
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />

          <Route element={<ProtectedRoute onlyUnAuth={false} />}>
            <Route
              path='/profile/orders/:number'
              element={
                <Modal
                  title={''}
                  onClose={() => {
                    history.back();
                  }}
                >
                  <OrderInfo />
                </Modal>
              }
            />
          </Route>
        </Routes>
      )}
    </div>
  );
};
export default App;
