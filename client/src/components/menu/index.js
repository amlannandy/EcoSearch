import { connect } from 'react-redux';
import { NavBar, List } from 'antd-mobile';
import React, { Component, Fragment } from 'react';

import { logout } from '../../actions/auth';

class Index extends Component {
  handleLogout = () => {
    const { logout } = this.props;
    logout();
  };

  render() {
    return (
      <Fragment>
        <NavBar mode='light'>Menu</NavBar>
        <List>
          <List.Item arrow='horizontal'>Update Password</List.Item>
          <List.Item arrow='horizontal'>Delete Account</List.Item>
          <List.Item arrow='horizontal' onClick={this.handleLogout}>
            Logout
          </List.Item>
        </List>
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
    logout: () => {
      return dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
