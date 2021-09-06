import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { FaChevronLeft, FaStopCircle } from 'react-icons/fa';
import {
  NavBar,
  Toast,
  WhiteSpace,
  WingBlank,
  Button,
  InputItem,
  TextareaItem,
  Card,
} from 'antd-mobile';

import './css/addRecord.css';
import Placeholder from '../../static/placeholder.jpg';
import { addRecord, fetchUserRecords } from '../../actions/index';

class AddRecord extends Component {
  state = {
    title: '',
    description: '',
    image: null,
    imageUrl: '',
    latitude: null,
    longitude: null,
    locationError: false,
  };

  componentDidMount() {
    this.getCurrentLocation();
  }

  getCurrentLocation = () => {
    navigator.permissions
      .query({ name: 'geolocation' })
      .then(res => {
        if (res.state === 'granted' || res.state === 'prompt') {
          navigator.geolocation.getCurrentPosition(pos => {
            this.setState({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            });
          });
        } else {
          this.setState({ locationError: true });
        }
      })
      .catch(() => this.setState({ locationError: true }));
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleImageInput = e => {
    const image = e.target.files[0];
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    this.setState({ image, imageUrl });
  };

  handleAddRecord = () => {
    const { addRecord } = this.props;
    addRecord(this.state, this.successCallback, this.errorCallback);
  };

  successCallback = () => {
    const { history, fetchUserRecords } = this.props;
    history.goBack();
    Toast.success('Record uploaded');
    fetchUserRecords();
  };

  errorCallback = err => {
    Toast.fail(err);
  };

  render() {
    const {
      history,
      records: {
        recordsActions: { isAdding },
      },
    } = this.props;
    const { title, description, imageUrl, locationError } = this.state;

    return (
      <Fragment>
        <NavBar
          mode='light'
          leftContent={<FaChevronLeft onClick={() => history.goBack()} />}>
          Add Record
        </NavBar>
        {!locationError ? (
          <WingBlank>
            <WhiteSpace size='lg' />
            <img
              className='custom-image'
              alt='profile-avatar'
              src={imageUrl ? imageUrl : Placeholder}
            />
            <WhiteSpace size='lg' />
            <InputItem
              name='image'
              type='file'
              onChangeCapture={this.handleImageInput}
              disabled={isAdding}
            />
            <WhiteSpace size='lg' />
            <InputItem
              name='title'
              value={title}
              error={!title}
              placeholder='Enter title'
              onChangeCapture={this.handleChange}
              disabled={isAdding}
            />
            <WhiteSpace size='sm' />
            <TextareaItem
              rows={3}
              name='description'
              value={description}
              error={!description}
              placeholder='Enter description'
              onChangeCapture={this.handleChange}
              disabled={isAdding}
            />
            <WhiteSpace size='lg' />
            <Button
              type='primary'
              onClick={this.handleAddRecord}
              disabled={!title || !description || !imageUrl || isAdding}>
              Save
            </Button>
            <WhiteSpace size='lg' />
          </WingBlank>
        ) : (
          <WingBlank size='lg'>
            <WhiteSpace size='lg' />
            <Card>
              <Card.Header
                title='Location Error'
                thumb={<FaStopCircle className='ml-5' />}
              />
              <Card.Body>
                <strong>Error getting your location</strong>
                <p>
                  Please provide permission for getting your current location
                  for geotagging
                </p>
                <Button type='warning' onClick={this.getCurrentLocation}>
                  Grant
                </Button>
              </Card.Body>
            </Card>
            <WhiteSpace size='lg' />
          </WingBlank>
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
    fetchUserRecords: () => {
      return dispatch(fetchUserRecords());
    },
    addRecord: (data, success, error) => {
      return dispatch(addRecord(data, success, error));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRecord);
