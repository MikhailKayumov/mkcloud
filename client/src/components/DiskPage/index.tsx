import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';

import { Disk } from './Disk';

import './styles.scss';

const excludedPath = ['/login', '/registration'];

export const DiskPage: React.FC = (): JSX.Element | null => {
  const { pathname } = useLocation();
  const [afterLogin, setAfterLogin] = useState(excludedPath.includes(pathname));

  useEffect(() => {
    setAfterLogin(excludedPath.includes(pathname));
  }, [pathname]);

  return (
    <Switch>
      {!afterLogin && <Route path="/" component={Disk} />}
      <Redirect to="/" />
    </Switch>
  );
};
