import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

class GuestRoute extends Component {
  render() {
    const {
      authActions: { isAuthenticated, isInitialized, isLoading },
      ...rest
    } = this.props;

    if (isInitialized && !isLoading && isAuthenticated) {
      return <Redirect to='/' />;
    }

    return <Route {...rest} render={props => <React.Component {...props} />} />;
  }
}

const mapStateToProps = state => {
  return {
    authActions: state.auth.authActions,
  };
};

export default connect(mapStateToProps)(GuestRoute);
