import React, { Component, Fragment } from 'react';
import { NavBar, List } from 'antd-mobile';

class Index extends Component {
  render() {
    return (
      <Fragment>
        <NavBar mode='light'>Menu</NavBar>
        <List>
          <List.Item arrow='horizontal'>Update Password</List.Item>
          <List.Item arrow='horizontal'>Delete Account</List.Item>
          <List.Item arrow='horizontal'>Logout</List.Item>
        </List>
      </Fragment>
    );
  }
}

export default Index;
