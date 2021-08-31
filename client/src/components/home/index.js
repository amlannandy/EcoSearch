import { connect } from 'react-redux';
import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import { NavBar } from 'antd-mobile';
import { FaBars, FaMapPin } from 'react-icons/fa';

import './css/index.css';
import LandingCard from './landingCard';
import { fetchAllRecords } from '../../actions/index';

const defaultProps = {
  center: {
    lat: 34,
    lng: 45,
  },
  zoom: 11,
};

class Index extends Component {
  componentDidMount() {
    const { fetchAllRecords } = this.props;
    fetchAllRecords();
  }

  render() {
    const {
      history,
      auth: { authActions },
      records: { records },
    } = this.props;

    return (
      <div className='map-container'>
        <GoogleMap
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}>
          {records.map(record => (
            <FaMapPin
              size={25}
              color='#d72323'
              lat={record.latitude}
              lng={record.longitude}
              text={record.title}
            />
          ))}
        </GoogleMap>
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
    records: state.records,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllRecords: () => {
      return dispatch(fetchAllRecords());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
