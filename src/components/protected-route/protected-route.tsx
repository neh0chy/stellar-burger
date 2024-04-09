import { useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) =>
  //   const isAuthChecked = useSelector(isAuthCheckedSelector); //isAuthCheckedSelector селектор получения состояния загрузки пользователя
  //   const user = useSelector(userDataSelector); //userDataSelector селектор получения пользователя из store
  // const location = useLocation();

  // if (!isAuthChecked) { // пока идет чекайут пользователя показывам прелоадер
  //   return <Preloader />;
  // }

  // if (!onlyUnAuth && !user) { //если пользователь на странице авторизации и данных в хранилише нет, то делаем редирект
  //   return <Navigate replace to='/login' state={{ from: location }} />; // в поле from объекта location.state записываем информацию о url
  // }

  // if (onlyUnAuth && user) { //если пользователь на странице авторизации и данные есть в хранилише
  //   // при обратном редиректе, получаем данные о месте назначения редиректа из объекта location.state
  //       // в случаем если объекта location.state?.from нет, а такое может быть если мы зашли на страницу логина по прямому url
  //       // мы сами создаем объект c указанием адреса и делаем переадресацию на главную страницу
  //       const from  = location.state?.from || { pathname: '/' };

  //       return <Navigate replace to={from} />;
  // }

  children;
