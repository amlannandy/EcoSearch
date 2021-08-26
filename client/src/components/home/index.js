import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import { NavBar } from 'antd-mobile';

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
    return (
      <div className='map-container'>
        <GoogleMap
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}></GoogleMap>
        <NavBar className='map-navbar' />
        <LandingCard />
      </div>
    );
  }
}

export default Index;
