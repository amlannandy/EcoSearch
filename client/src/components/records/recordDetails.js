import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import React, { Component, Fragment } from 'react';
import { FaChevronLeft, FaMapPin } from 'react-icons/fa';
import {
  NavBar,
  WingBlank,
  WhiteSpace,
  ActivityIndicator,
  Badge,
} from 'antd-mobile';

import './css/recordDetails.css';
import { getRecordById } from '../../actions/index';

class RecordDetails extends Component {
  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      getRecordById,
    } = this.props;
    getRecordById(id);
  }

  render() {
    const {
      history,
      records: {
        record,
        recordsActions: { isFetching, error },
      },
    } = this.props;

    return (
      <Fragment>
        <NavBar
          mode='light'
          leftContent={<FaChevronLeft onClick={() => history.goBack()} />}>
          Record Details
        </NavBar>
        {isFetching ? (
          <div className='loading-container'>
            <ActivityIndicator text='Loading...' size='large' />
          </div>
        ) : (
          <div className='bg-white'>
            <img
              className='image-container'
              src={record.imageUrl}
              alt='Record'
            />
            <WingBlank>
              <h1>
                {record.title}
                <Badge
                  text={record.label ? record.label : 'Unknown'}
                  style={{ marginLeft: 12 }}
                />
              </h1>
              <p>{record.description}</p>
              <hr />
              <WhiteSpace size='lg' />
              <strong>
                <FaMapPin size={15} />
                Your Location
              </strong>
              <WhiteSpace size='lg' />
            </WingBlank>
            <div className='map-container'>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                }}
                defaultCenter={{
                  lat: record.latitude,
                  lng: record.longitude,
                }}
                defaultZoom={11}>
                <FaMapPin
                  size={28}
                  color='#d72323'
                  lat={record.latitude}
                  lng={record.longitude}
                  text='Location'
                />
              </GoogleMapReact>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    records: state.records,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRecordById: id => {
      return dispatch(getRecordById(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecordDetails);
