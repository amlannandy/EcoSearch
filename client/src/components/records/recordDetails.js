import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import React, { Component, Fragment } from 'react';
import {
  FaChevronLeft,
  FaMapPin,
  FaTrash,
  FaEdit,
  FaStopCircle,
} from 'react-icons/fa';
import {
  NavBar,
  WingBlank,
  WhiteSpace,
  ActivityIndicator,
  Badge,
  Toast,
  Card,
  Popover,
  Icon,
} from 'antd-mobile';

import './css/recordDetails.css';
import {
  getRecordById,
  deleteRecordById,
  fetchUserRecords,
} from '../../actions/index';

class RecordDetails extends Component {
  state = {
    visible: false,
  };

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      getRecordById,
    } = this.props;
    getRecordById(id);
  }

  handleVisibleChange = visible => this.setState({ visible });

  onSelect = opt => {
    const key = parseInt(opt.key);
    switch (key) {
      case 0:
        console.log('Edit');
        break;
      case 1:
        this.handleDeleteRecord();
        break;
      default:
        break;
    }
    this.setState({
      visible: false,
    });
  };

  handleDeleteRecord = () => {
    const {
      match: {
        params: { id },
      },
      deleteRecordById,
    } = this.props;
    deleteRecordById(id, this.deleteSuccessCallback, this.errorCallback);
  };

  deleteSuccessCallback = () => {
    const { history, fetchUserRecords } = this.props;
    history.goBack();
    Toast.success('Record deleted');
    fetchUserRecords();
  };

  errorCallback = err => {
    Toast.fail(err);
  };

  render() {
    const {
      history,
      records: {
        record,
        recordsActions: { isFetching, isDeleting, error },
      },
    } = this.props;

    return (
      <Fragment>
        <NavBar
          mode='light'
          leftContent={<FaChevronLeft onClick={() => history.goBack()} />}
          rightContent={
            <Popover
              mask
              visible={this.state.visible}
              overlay={[
                <Popover.Item key={0} icon={<FaEdit />}>
                  Edit
                </Popover.Item>,
                <Popover.Item key={1} icon={<FaTrash />}>
                  Delete
                </Popover.Item>,
              ]}
              align={{
                overflow: { adjustY: 0, adjustX: 0 },
                offset: [-10, 0],
              }}
              onVisibleChange={this.handleVisibleChange}
              onSelect={this.onSelect}>
              <div className='popover'>
                <Icon type='ellipsis' />
              </div>
            </Popover>
          }>
          Record Details
        </NavBar>
        {isFetching || isDeleting ? (
          <div className='loading-container'>
            <ActivityIndicator text='Loading...' size='large' />
          </div>
        ) : error && !record ? (
          <WingBlank>
            <WhiteSpace size='lg' />
            <Card>
              <Card.Header
                title='Oops! Something went wrong!'
                thumb={<FaStopCircle className='ml-5' />}
              />
              <Card.Body>
                <strong>Error</strong>
                <p>{error}</p>
              </Card.Body>
            </Card>
            <WhiteSpace size='lg' />
          </WingBlank>
        ) : record ? (
          <div className='screen'>
            <img
              className='image-container'
              src={record.imageUrl}
              alt='Record'
            />
            <div className='py-5'>
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
                <FaMapPin size={15} className='mr-5' />
                Your Location
              </strong>
              <WhiteSpace size='lg' />
            </div>
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
        ) : null}
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
    fetchUserRecords: () => {
      return dispatch(fetchUserRecords());
    },
    getRecordById: id => {
      return dispatch(getRecordById(id));
    },
    deleteRecordById: (id, successCallback, errorCallback) => {
      return dispatch(deleteRecordById(id, successCallback, errorCallback));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecordDetails);
