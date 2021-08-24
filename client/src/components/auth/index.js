import React, { Fragment } from 'react';
import { Tabs } from 'antd-mobile';

import Login from './login';
import Register from './register';

const Auth = ({ match }) => {
  const tabs = [{ title: 'Login' }, { title: 'Register' }];

  return (
    <Fragment>
      <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false}>
        <Login />
        <Register />
      </Tabs>
    </Fragment>
  );
};

export default Auth;
