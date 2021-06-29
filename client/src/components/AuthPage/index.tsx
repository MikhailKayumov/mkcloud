import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { LoginForm } from './LoginForm';
import { RegistrationForm } from './RegistrationForm';

import './styles.scss';

export const AuthPage: React.FC = (): JSX.Element => {
  return (
    <Switch>
      <Route path="/login" component={LoginForm} />
      <Route path="/registration" component={RegistrationForm} />
      <Redirect to="/login" />
    </Switch>
  );
};
