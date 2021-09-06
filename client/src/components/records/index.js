import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { FaChevronLeft, FaPlus } from 'react-icons/fa';
import { NavBar, ActivityIndicator } from 'antd-mobile';

import './css/index.css';
import RecordItem from './recordItem';
import { fetchUserRecords } from '../../actions/index';

class Index extends Component {
  componentDidMount() {
    const { fetchUserRecords } = this.props;
    fetchUserRecords();
  }

  render() {
    const {
      history,
      records: {
        records,
        recordsActions: { isFetching },
      },
    } = this.props;

    return (
      <Fragment>
        <NavBar
          mode='light'
          rightContent={[
            <FaPlus onClick={() => history.push('/add-record')} />,
          ]}
          leftContent={<FaChevronLeft onClick={() => history.goBack()} />}>
          Your Records
        </NavBar>
        {isFetching ? (
          <div className='loading-container'>
            <ActivityIndicator text='Loading...' size='large' />
          </div>
        ) : (
          <div className='custom-grid'>
            {records.map(record => (
              <RecordItem record={record} history={history} />
            ))}
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
    fetchUserRecords: () => {
      dispatch(fetchUserRecords());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
