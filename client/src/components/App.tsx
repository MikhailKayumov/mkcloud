import './styles.scss';

import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useDispatch } from 'store';
import { userSelectors, userThunks } from 'store/user';

import { FlexBox } from 'utils/components/FlexBox';
import { Navbar } from './Navbar';
import { Loader } from './Loader';
import { Disk } from './Disk';
import { Login } from './Auth/Login';
import { Registration } from './Auth/Registration';

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
    <Switch>
      <Route exact path="/" component={Disk} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <BrowserRouter>
      <div id="app">
        <Navbar />
        <FlexBox direction="column" className="wrap">
          {isLoading ? <Loader /> : content}
        </FlexBox>
      </div>
    </BrowserRouter>
  );
};

export default App;
