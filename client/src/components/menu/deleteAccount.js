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

import { deleteAccount } from '../../actions/index';

class DeleteAccount extends Component {
  state = {
    password: '',
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleDeleteAccount = () => {
    const { deleteAccount } = this.props;
    deleteAccount(
      this.state.password,
      this.onSuccessCallback,
      this.onErrorCallback
    );
  };

  onSuccessCallback = () => {
    Toast.success('Account deleted');
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
        <NavBar
          mode='light'
          leftContent={<FaChevronLeft onClick={() => history.goBack()} />}>
          Delete
        </NavBar>
        <WingBlank>
          <WhiteSpace size='md' />
          <InputItem
            name='password'
            type='password'
            value={this.state.password}
            placeholder='Enter your password'
            onChangeCapture={this.handleChange}
            disabled={authActions.isUpdating}
          />
          <WhiteSpace size='md' />
          <Button
            type='warning'
            disabled={authActions.isUpdating || !this.state.password}
            onClick={this.handleDeleteAccount}>
            Confirm
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
    deleteAccount: (password, successCallback, errorCallback) => {
      return dispatch(deleteAccount(password, successCallback, errorCallback));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount);
