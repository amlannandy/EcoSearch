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
import UserRecords from './components/records/index';
import UpdateInfo from './components/menu/updateInfo';
import UploadImage from './components/menu/uploadImage';
import DeleteAccount from './components/menu/deleteAccount';
import ResetPassword from './components/auth/resetPassword';
import ForgotPassword from './components/auth/forgotPassword';
import UpdatePassword from './components/menu/updatePassword';
import RecordDetails from './components/records/recordDetails';

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
              <PrivateRoute path='/records/:id' component={RecordDetails} />
              <PrivateRoute path='/records' component={UserRecords} />
              <PrivateRoute
                path='/update-password'
                component={UpdatePassword}
              />
              <PrivateRoute path='/update-info' component={UpdateInfo} />
              <PrivateRoute path='/upload-image' component={UploadImage} />
              <PrivateRoute path='/delete-account' component={DeleteAccount} />
              <GuestRoute path='/forgot-password' component={ForgotPassword} />
              <GuestRoute
                path='/reset-password/:token'
                component={ResetPassword}
              />
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
