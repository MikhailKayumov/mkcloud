import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useDispatch } from 'store';
import { userSelectors } from 'store/user';

import { FlexBox } from 'utils/components/FlexBox';
import { Navbar } from './Navbar';
import { Registration } from './Auth/Registration';

import { Login } from './Auth/Login';
import './styles.scss';
import { userThunks } from '../store/user/extraActions';

const App: React.FC = (): JSX.Element => {
  const isAuth = useSelector(userSelectors.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userThunks.auth());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div id="app">
        <Navbar />
        <FlexBox direction="column" className="wrap">
          {!isAuth ? (
            <Switch>
              <Route path="/registration" component={Registration} />
              <Route path="/login" component={Login} />
            </Switch>
          ) : null}
        </FlexBox>
      </div>
    </BrowserRouter>
  );
};

export default App;
