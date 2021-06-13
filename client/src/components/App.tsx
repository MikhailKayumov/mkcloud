import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { FlexBox } from 'utils/components/FlexBox';
import { Navbar } from './Navbar';
import { Registration } from './Registration';

import './styles.scss';

const App: React.FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <div id="app">
        <Navbar />
        <FlexBox direction="column" className="wrap">
          <Switch>
            <Route path="/registration" component={Registration} />
          </Switch>
        </FlexBox>
      </div>
    </BrowserRouter>
  );
};

export default App;
