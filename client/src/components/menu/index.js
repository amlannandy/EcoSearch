import { connect } from 'react-redux';
import { NavBar, List, WingBlank, WhiteSpace, Badge } from 'antd-mobile';
import { FaChevronLeft } from 'react-icons/fa';
import React, { Component, Fragment } from 'react';

import './css/index.css';
import { logout } from '../../actions/auth';

class Index extends Component {
  handleLogout = () => {
    const { logout } = this.props;
    logout();
  };

  render() {
    const {
      history,
      auth: { user, authActions },
    } = this.props;

    return (
      <Fragment>
        <NavBar
          mode='light'
          leftContent={<FaChevronLeft onClick={() => history.goBack()} />}>
          Menu
        </NavBar>
        {authActions.isAuthenticated && user ? (
          <WingBlank className='circle-avatar'>
            <WhiteSpace size='lg' />
            <div>
              <Badge
                text='EDIT'
                onClick={() => history.push('/upload-image')}
                style={{
                  marginLeft: -25,
                  padding: '1px 5px',
                  backgroundColor: '#21b68a',
                  borderRadius: 10,
                }}>
                <img src={user.imageUrl} alt='profile avatar' />
              </Badge>
            </div>
            <p>{user.name}</p>
            <small>{user.email}</small>
            <WhiteSpace size='lg' />
          </WingBlank>
        ) : null}
        <List>
          <List.Item
            arrow='horizontal'
            onClick={() => history.push('/update-password')}>
            Update Password
          </List.Item>
          <List.Item
            arrow='horizontal'
            onClick={() => history.push('/delete-account')}>
            Delete Account
          </List.Item>
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
