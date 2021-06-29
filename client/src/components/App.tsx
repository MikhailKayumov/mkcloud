import './styles.scss';

import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useDispatch } from 'store';
import { userActions, userSelectors, userThunks } from 'store/user';

import { FlexBox } from 'utils/components/FlexBox';
import { Navbar } from './Navbar';
import { DiskPage } from './DiskPage';
import { AuthPage } from './AuthPage';
import $jwt from '../utils/jwt';

const App: React.FC = (): JSX.Element | null => {
  const [isInit, setIsInit] = useState(false);
  const dispatch = useDispatch();
  const isAuth = useSelector(userSelectors.isAuth);

  useEffect(() => {
    if ($jwt.has()) {
      dispatch(userActions.showLoading());
      dispatch(userThunks.refresh()).then(({ meta }) => {
        if (meta.requestStatus === 'rejected') {
          dispatch(userActions.logout());
        }
        dispatch(userActions.hideLoading());
        setIsInit(true);
      });
    } else {
      setIsInit(true);
    }
  }, [dispatch]);

  const content = !isAuth ? <AuthPage /> : <DiskPage />;

  return (
    <BrowserRouter>
      <div id="app">
        <Navbar />
        <FlexBox direction="column" className="wrap">
          {isInit ? content : null}
        </FlexBox>
      </div>
    </BrowserRouter>
  );
};

export default App;
