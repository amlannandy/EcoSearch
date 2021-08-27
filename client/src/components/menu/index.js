import { connect } from 'react-redux';
import { NavBar, List } from 'antd-mobile';
import { FaChevronLeft } from 'react-icons/fa';
import React, { Component, Fragment } from 'react';

import { logout } from '../../actions/auth';

class Index extends Component {
  handleLogout = () => {
    const { logout } = this.props;
    logout();
  };

  render() {
    const { history } = this.props;

    return (
      <Fragment>
        <NavBar
          mode='light'
          leftContent={<FaChevronLeft onClick={() => history.goBack()} />}>
          Menu
        </NavBar>
        <List>
          <List.Item
            arrow='horizontal'
            onClick={() => history.push('/update-password')}>
            Update Password
          </List.Item>
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
