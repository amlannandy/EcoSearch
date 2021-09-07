import { connect } from 'react-redux';
import { FaChevronLeft } from 'react-icons/fa';
import React, { Component, Fragment } from 'react';
import {
  NavBar,
  WingBlank,
  WhiteSpace,
  InputItem,
  TextareaItem,
  Button,
  Toast,
} from 'antd-mobile';

import { getRecordById, updateRecordById } from '../../actions/index';

class EditRecord extends Component {
  constructor(props) {
    super(props);
    const {
      records: { record },
    } = props;
    if (record) {
      this.state = {
        title: record.title,
        description: record.description,
      };
    } else {
      this.state = {
        title: '',
        description: '',
      };
    }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleUpdateRecord = () => {
    const {
      match: {
        params: { id },
      },
      updateRecordById,
    } = this.props;
    updateRecordById(id, this.state, this.successCallback, this.errorCallback);
  };

  successCallback = () => {
    const {
      history,
      match: {
        params: { id },
      },
      getRecordById,
    } = this.props;
    Toast.success('Record updated');
    history.goBack();
    getRecordById(id);
  };

  errorCallback = err => {
    Toast.fail(err);
  };

  render() {
    const {
      history,
      records: {
        recordsActions: { isUpdating },
      },
    } = this.props;
    const { title, description } = this.state;

    return (
      <Fragment>
        <NavBar
          mode='light'
          leftContent={<FaChevronLeft onClick={() => history.goBack()} />}>
          Edit Record
        </NavBar>
        <WingBlank>
          <WhiteSpace size='lg' />
          <InputItem
            name='title'
            value={title}
            error={!title}
            placeholder='Enter title'
            onChangeCapture={this.handleChange}
            disabled={isUpdating}
          />
          <WhiteSpace size='sm' />
          <TextareaItem
            rows={3}
            name='description'
            value={description}
            error={!description}
            placeholder='Enter description'
            onChangeCapture={this.handleChange}
            disabled={isUpdating}
          />
          <WhiteSpace size='lg' />
          <Button
            type='primary'
            onClick={this.handleUpdateRecord}
            disabled={!title || !description || isUpdating}>
            Save
          </Button>
        </WingBlank>
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
    updateRecordById: (id, data, success, error) => {
      return dispatch(updateRecordById(id, data, success, error));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRecord);
