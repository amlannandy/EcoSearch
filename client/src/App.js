import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './app.css';
import store from './utils/store';
import Home from './components/home/index';
import Auth from './components/auth/index';

const App = () => {
  return (
    <Provider store={store}>
      <Fragment>
        <BrowserRouter>
          <Switch>
            <Route path='/auth' component={Auth} />
            <Route path='/' component={Home} />
          </Switch>
        </BrowserRouter>
      </Fragment>
    </Provider>
  );
};

export default App;
