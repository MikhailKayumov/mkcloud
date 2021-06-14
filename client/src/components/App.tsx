import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useDispatch } from 'store';
import { userSelectors } from 'store/user';
import { userThunks } from 'store/user/extraActions';

import { FlexBox } from 'utils/components/FlexBox';
import { Navbar } from './Navbar';
import { Registration } from './Auth/Registration';
import { Login } from './Auth/Login';

import './styles.scss';

const App: React.FC = (): JSX.Element => {
  const isAuth = useSelector(userSelectors.isAuth);
  const isLoading = useSelector(userSelectors.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userThunks.auth());
  }, [dispatch]);

  const content = !isAuth ? (
    <Switch>
      <Route path="/registration" component={Registration} />
      <Route path="/login" component={Login} />
      <Redirect to="/login" />
    </Switch>
  ) : (
    <h1>Hello</h1>
  );

  return (
    <BrowserRouter>
      <div id="app">
        <Navbar />
        <FlexBox direction="column" className="wrap">
          {isLoading ? (
            <FlexBox justify="center" className="content-loader">
              <div className="content-loader__content">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </FlexBox>
          ) : (
            content
          )}
        </FlexBox>
      </div>
    </BrowserRouter>
  );
};

export default App;
