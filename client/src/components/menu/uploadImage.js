import { connect } from 'react-redux';
import { FaChevronLeft } from 'react-icons/fa';
import React, { Component, Fragment } from 'react';
import {
  WhiteSpace,
  WingBlank,
  Toast,
  InputItem,
  NavBar,
  Button,
} from 'antd-mobile';

import './css/uploadImage.css';
import Placeholder from '../../static/placeholder.jpg';
import { uploadImage, loadUser } from '../../actions/index';

class UploadImage extends Component {
  state = {
    image: null,
    imageUrl: null,
  };

  handleImageInput = e => {
    const image = e.target.files[0];
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    this.setState({ image, imageUrl });
  };

  handleUploadImage = () => {
    const { image } = this.state;
    const { uploadImage } = this.props;
    uploadImage(image, this.successCallback, this.errorCallback);
  };

  successCallback = () => {
    const { history, loadUser } = this.props;
    history.goBack();
    Toast.success('Profile picture updated');
    loadUser();
  };

  errorCallback = err => {
    Toast.fail(err);
  };

  render() {
    const { image, imageUrl } = this.state;
    const {
      history,
      auth: { authActions },
    } = this.props;

    return (
      <Fragment>
        <NavBar
          mode='light'
          leftContent={<FaChevronLeft onClick={() => history.goBack()} />}>
          Update Profile Picture
        </NavBar>
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
            disabled={authActions.isUpdating}
          />
          <WhiteSpace size='lg' />
          <Button
            type='primary'
            disabled={!image || authActions.isUpdating}
            onClick={this.handleUploadImage}>
            Update
          </Button>
        </WingBlank>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadImage: (image, successCallback, errorCallback) => {
      return dispatch(uploadImage(image, successCallback, errorCallback));
    },
    loadUser: () => {
      return dispatch(loadUser());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadImage);
