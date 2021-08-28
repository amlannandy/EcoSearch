import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import {
  NavBar,
  WingBlank,
  WhiteSpace,
  InputItem,
  Button,
  Toast,
} from 'antd-mobile';

import './css/forgotPassword.css';
import { forgotPassword } from '../../actions/index';

class ForgotPassword extends Component {
  state = {
    email: '',
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleForgotPassword = () => {
    const { forgotPassword } = this.props;
    forgotPassword(
      this.state.email,
      this.onSuccessCallback,
      this.onErrorCallback
    );
  };

  onSuccessCallback = () => {
    this.setState({ email: '' });
    Toast.success('Password reset link sent to your email');
  };

  onErrorCallback = err => {
    Toast.fail(err);
  };

  render() {
    const {
      history,
      auth: { authActions },
    } = this.props;

    return (
      <Fragment>
        <NavBar>Forgot Password</NavBar>
        <WingBlank>
          <WhiteSpace size='lg' />
          <p className='body-text'>
            Please enter the email address associated with your account. You
            will recieve an email link to reset your password.
          </p>
          <InputItem
            name='email'
            type='email'
            value={this.state.email}
            placeholder='Enter your email'
            onChangeCapture={this.handleChange}
            disabled={authActions.isResetting}
          />
          <WhiteSpace size='md' />
          <Button
            type='primary'
            disabled={authActions.isResetting || !this.state.email}
            onClick={this.handleForgotPassword}>
            Confirm
          </Button>
          <WhiteSpace size='sm' />
          <Button
            type='warning'
            disabled={authActions.isResetting}
            onClick={() => history.goBack()}>
            Cancel
          </Button>
        </WingBlank>
      </Fragment>
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
    forgotPassword: (email, successCallback, errorCallback) => {
      return dispatch(forgotPassword(email, successCallback, errorCallback));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
