import { Provider } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './app.css';
import store from './utils/store';
import { loadUser } from './actions/index';
import GuestRoute from './utils/guestRoute';
import PrivateRoute from './utils/privateRoute';

import Home from './components/home/index';
import Auth from './components/auth/index';
import Menu from './components/menu/index';
import DeleteAccount from './components/menu/deleteAccount';
import ForgotPassword from './components/auth/forgotPassword';
import UpdatePassword from './components/menu/updatePassword';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <BrowserRouter>
            <Switch>
              <PrivateRoute
                path='/update-password'
                component={UpdatePassword}
              />
              <PrivateRoute path='/delete-account' component={DeleteAccount} />
              <GuestRoute path='/forgot-password' component={ForgotPassword} />
              <PrivateRoute path='/menu' component={Menu} />
              <GuestRoute path='/auth' component={Auth} />
              <Route path='/' component={Home} />
            </Switch>
          </BrowserRouter>
        </Fragment>
      </Provider>
    );
  }
}

export default App;
