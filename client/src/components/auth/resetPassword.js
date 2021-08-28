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

import { resetPassword } from '../../actions/index';

class ResetPassword extends Component {
  state = {
    password: '',
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleResetPassword = () => {
    const {
      resetPassword,
      match: {
        params: { token },
      },
    } = this.props;
    resetPassword(
      token,
      this.state.password,
      this.onSuccessCallback,
      this.onErrorCallback
    );
  };

  onSuccessCallback = () => {
    const { history } = this.props;
    history.push('/auth');
    Toast.success('Password reset successful');
  };

  onErrorCallback = err => {
    Toast.fail(err);
  };

  render() {
    const {
      auth: { authActions },
    } = this.props;
    const { password } = this.state;

    return (
      <Fragment>
        <NavBar>Reset Password</NavBar>
        <WingBlank>
          <WhiteSpace size='md' />
          <p>Please enter your new password</p>
          <WhiteSpace size='md' />
          <InputItem
            name='password'
            type='password'
            value={password}
            placeholder='Enter current password'
            onChangeCapture={this.handleChange}
            disabled={authActions.isResetting}
          />
          <WhiteSpace size='md' />
          <Button
            type='primary'
            disabled={authActions.isResetting || !password}
            onClick={this.handleResetPassword}>
            Update Password
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
    resetPassword: (token, password, successCallback, errorCallback) => {
      return dispatch(
        resetPassword(token, password, successCallback, errorCallback)
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
