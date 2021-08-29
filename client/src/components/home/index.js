import { connect } from 'react-redux';
import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import { NavBar } from 'antd-mobile';
import { FaBars } from 'react-icons/fa';

import './css/index.css';
import LandingCard from './landingCard';

const defaultProps = {
  center: {
    lat: 10.99835602,
    lng: 77.01502627,
  },
  zoom: 11,
};

class Index extends Component {
  render() {
    const {
      history,
      auth: { authActions },
    } = this.props;

    return (
      <div className='map-container'>
        <GoogleMap
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}></GoogleMap>
        <NavBar
          className='map-navbar'
          leftContent={
            authActions.isAuthenticated ? (
              <FaBars
                className='clickable'
                onClick={() => history.push('/menu')}
              />
            ) : null
          }>
          FloraSearch
        </NavBar>
        <LandingCard history={history} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Index);
