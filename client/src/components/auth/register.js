import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';
import { WingBlank, InputItem, Button, WhiteSpace } from 'antd-mobile';

const Register = () => {
  return (
    <WingBlank>
      <WhiteSpace size='lg' />
      <div className='header'>
        <h1>Register</h1>
        <p>To join this community of flower enthusiasts</p>
      </div>
      <WhiteSpace size='lg' />
      <InputItem name='name' placeholder='Enter name' />
      <WhiteSpace size='sm' />
      <InputItem name='email' placeholder='Enter email address' />
      <WhiteSpace size='sm' />
      <InputItem name='password' placeholder='Enter password' />
      <WhiteSpace size='md' />
      <InputItem name='confirmPassword' placeholder='Confirm password' />
      <WhiteSpace size='md' />
      <Button type='primary'>Register</Button>
      <div className='forgot-password-text'>
        <Link to='/forgot-password'>Forgot Password?</Link>
      </div>
    </WingBlank>
  );
};

export default Register;
