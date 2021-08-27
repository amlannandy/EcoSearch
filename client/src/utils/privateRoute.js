import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends Component {
  render() {
    const {
      authActions: { isAuthenticated, isInitialized, isLoading },
      ...rest
    } = this.props;

    if (isInitialized && !isLoading && !isAuthenticated) {
      return <Redirect to='/auth' />;
    }

    return <Route {...rest} render={props => <React.Component {...props} />} />;
  }
}

const mapStateToProps = state => {
  return {
    authActions: state.auth.authActions,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
