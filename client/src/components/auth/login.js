import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';
import { WingBlank, InputItem, Button, WhiteSpace } from 'antd-mobile';

const Login = () => {
  return (
    <WingBlank>
      <WhiteSpace size='lg' />
      <div className='header'>
        <h1>Login</h1>
        <p>To start uploading your flowers</p>
      </div>
      <WhiteSpace size='lg' />
      <InputItem name='email' placeholder='Enter email address' />
      <WhiteSpace size='sm' />
      <InputItem name='password' placeholder='Enter password' />
      <WhiteSpace size='md' />
      <Button type='primary'>Login</Button>
      <div className='forgot-password-text'>
        <Link to='/forgot-password'>Forgot Password?</Link>
      </div>
    </WingBlank>
  );
};

export default Login;
