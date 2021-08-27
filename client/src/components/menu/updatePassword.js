import { connect } from 'react-redux';
import { FaChevronLeft } from 'react-icons/fa';
import React, { Component, Fragment } from 'react';
import {
  NavBar,
  WingBlank,
  WhiteSpace,
  InputItem,
  Button,
  Toast,
} from 'antd-mobile';

import { updatePassword } from '../../actions/index';

class UpdatePassword extends Component {
  state = {
    currentPassword: '',
    newPassword: '',
    isFormValid: false,
  };

  handleChange = e =>
    this.setState({ [e.target.name]: e.target.value }, this.validateForm);

  validateForm = () => {
    const { currentPassword, newPassword } = this.state;
    const isFormValid =
      currentPassword && newPassword && newPassword.trim().length >= 6;
    this.setState({ isFormValid });
  };

  handleUpdatePassword = () => {
    const { updatePassword } = this.props;
    const { currentPassword, newPassword } = this.state;
    updatePassword(
      currentPassword,
      newPassword,
      this.onSuccessCallback,
      this.onErrorCallback
    );
  };

  onSuccessCallback = () => {
    Toast.success('Password updated');
    const { history } = this.props;
    history.goBack();
  };

  onErrorCallback = err => {
    Toast.fail(err);
  };

  render() {
    const {
      history,
      auth: { authActions },
    } = this.props;
    const { currentPassword, newPassword, isFormValid } = this.state;

    return (
      <Fragment>
        <NavBar
          mode='light'
          leftContent={<FaChevronLeft onClick={() => history.goBack()} />}>
          Update Password
        </NavBar>
        <WingBlank>
          <WhiteSpace size='md' />
          <InputItem
            name='currentPassword'
            type='password'
            value={currentPassword}
            placeholder='Enter current password'
            onChangeCapture={this.handleChange}
            disabled={authActions.isUpdating}
          />
          <WhiteSpace size='sm' />
          <InputItem
            name='newPassword'
            type='password'
            value={newPassword}
            placeholder='Enter new password'
            onChangeCapture={this.handleChange}
            disabled={authActions.isUpdating}
          />
          <WhiteSpace size='md' />
          <Button
            type='primary'
            disabled={authActions.isUpdating || !isFormValid}
            onClick={this.handleUpdatePassword}>
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
    updatePassword: (
      currentPassword,
      newPassword,
      onSuccessCallback,
      onErrorCallback
    ) => {
      return dispatch(
        updatePassword(
          currentPassword,
          newPassword,
          onSuccessCallback,
          onErrorCallback
        )
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);
