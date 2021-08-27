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
    const { history } = this.props;

    return (
      <div className='map-container'>
        <GoogleMap
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}></GoogleMap>
        <NavBar
          className='map-navbar'
          leftContent={
            <FaBars
              className='clickable'
              onClick={() => history.push('/menu')}
            />
          }>
          FloraSearch
        </NavBar>
        <LandingCard />
      </div>
    );
  }
}

export default Index;
