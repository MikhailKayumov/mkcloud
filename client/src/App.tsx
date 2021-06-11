import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions, userSelectors } from './store/user/';

const App: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const isAuth = useSelector(userSelectors.isAuth);

  useEffect(() => {
    dispatch(userActions.setAuth(true))
  }, [dispatch]);

  return (
    <div className="App">
      {isAuth ? '1' : '0'}
    </div>
  );
};

export default App;
