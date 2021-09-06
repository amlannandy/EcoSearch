import React, { Component } from 'react';
import './css/recordItem.css';

class RecordItem extends Component {
  goToRecordDetails = () => {
    const {
      record: { id },
      history,
    } = this.props;
    history.push(`/records/${id}`);
  };

  render() {
    const { record } = this.props;

    return (
      <div className='record-item' onClick={this.goToRecordDetails}>
        <img src={record.imageUrl} alt='No Source' />
      </div>
    );
  }
}

export default RecordItem;
