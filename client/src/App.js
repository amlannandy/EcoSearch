import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './app.css';
import Home from './components/home/index';
import Auth from './components/auth/index';

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Route path='/auth' component={Auth} />
          <Route path='/' component={Home} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
