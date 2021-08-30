import { connect } from 'react-redux';
import { FaChevronLeft } from 'react-icons/fa';
import React, { Component, Fragment } from 'react';

import { updateInfo, loadUser } from '../../actions/index';
import {
  Toast,
  WingBlank,
  WhiteSpace,
  InputItem,
  Button,
  NavBar,
} from 'antd-mobile';

class UpdateInfo extends Component {
  constructor(props) {
    super(props);
    const user = props.auth.user;
    if (user) {
      this.state = {
        name: user.name,
        email: user.email,
      };
    } else {
      this.state = {
        name: '',
        email: '',
      };
    }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleUpdateInfo = () => {
    const { updateInfo } = this.props;
    updateInfo(this.state.name, this.successCallback, this.errorCallback);
  };

  successCallback = () => {
    const { history, loadUser } = this.props;
    Toast.success('Info updated');
    history.goBack();
    loadUser();
  };

  errorCallback = err => {
    Toast.fail(err);
  };

  render() {
    const { name, email } = this.state;
    const {
      history,
      auth: { authActions },
    } = this.props;

    return (
      <Fragment>
        <NavBar
          mode='light'
          leftContent={<FaChevronLeft onClick={() => history.goBack()} />}>
          Update Info
        </NavBar>
        <WingBlank>
          <WhiteSpace size='md' />
          <InputItem
            name='name'
            value={name}
            placeholder='Enter name'
            onChangeCapture={this.handleChange}
            disabled={authActions.isUpdating}
          />
          <WhiteSpace size='sm' />
          <InputItem
            name='email'
            value={email}
            placeholder='Enter email'
            onChangeCapture={this.handleChange}
            disabled={true}
          />
          <WhiteSpace size='md' />
          <Button
            type='primary'
            disabled={authActions.isUpdating || !name}
            onClick={this.handleUpdateInfo}>
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
    loadUser: () => {
      return dispatch(loadUser());
    },
    updateInfo: (name, successCallback, errorCallback) => {
      return dispatch(updateInfo(name, successCallback, errorCallback));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateInfo);
