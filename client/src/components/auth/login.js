import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';

import './css/index.css';
import { login } from '../../actions/index';
import { isEmail } from '../../utils/helpers';
import { WingBlank, InputItem, Button, WhiteSpace, Toast } from 'antd-mobile';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {
      emailError: null,
      passwordError: null,
      isFormValid: false,
    },
  };

  handleChange = e =>
    this.setState({ [e.target.name]: e.target.value }, this.validateForm);

  validateForm = () => {
    const { email, password } = this.state;
    let emailError = null,
      passwordError = null,
      isFormValid = false;
    if (!isEmail(email)) {
      emailError = 'Please enter a valid email';
    }
    if (password.trim().length < 6) {
      passwordError = 'Please provide a valid password';
    }
    if (!emailError && !passwordError) {
      isFormValid = true;
    }
    this.setState({ errors: { emailError, passwordError, isFormValid } });
  };

  handleLogin = () => {
    const { login } = this.props;
    const { email, password } = this.state;
    login(email, password, this.errorCallback);
  };

  errorCallback = error => {
    Toast.fail(error);
  };

  render() {
    const { email, password, errors } = this.state;
    const {
      auth: { authActions },
    } = this.props;

    return (
      <WingBlank>
        <WhiteSpace size='lg' />
        <div className='header'>
          <h1>Login</h1>
          <p>To start uploading your flowers</p>
        </div>
        <WhiteSpace size='lg' />
        <InputItem
          name='email'
          type='email'
          value={email}
          error={errors.emailError}
          placeholder='Enter email address'
          onChangeCapture={this.handleChange}
          disabled={authActions.isAuthenticating}
        />
        <WhiteSpace size='sm' />
        <InputItem
          name='password'
          type='password'
          value={password}
          error={errors.passwordError}
          placeholder='Enter password'
          onChangeCapture={this.handleChange}
          disabled={authActions.isAuthenticating}
        />
        <WhiteSpace size='md' />
        <Button
          type='primary'
          disabled={authActions.isAuthenticating || !errors.isFormValid}
          onClick={this.handleLogin}>
          Login
        </Button>
        <div className='forgot-password-text'>
          <Link to='/forgot-password'>Forgot Password?</Link>
        </div>
      </WingBlank>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password, errorCallback) => {
      return dispatch(login(email, password, errorCallback));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
