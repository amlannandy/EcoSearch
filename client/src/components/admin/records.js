import React, { useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Card, ActivityIndicator, Toast } from "antd-mobile";

import "./css/records.css";
import { getRecords, verifyRecord, blockRecord } from "../../actions/index";

function Records() {
  const dispatch = useDispatch();
  const {
    records,
    adminActions: { isLoading },
  } = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(getRecords());
  }, [dispatch]);

  function handleVerifyRecord(id) {
    dispatch(verifyRecord(id, successCallback, errorCallback));
  }

  function handleBlockRecord(id) {
    dispatch(blockRecord(id, successCallback, errorCallback));
  }

  function successCallback(msg) {
    Toast.success(msg);
    dispatch(getRecords());
  }

  function errorCallback(err) {
    Toast.fail(err);
    dispatch(getRecords());
  }

  if (isLoading) {
    return (
      <div className='loading-container'>
        <ActivityIndicator text='Loading...' size='large' />
      </div>
    );
  }

  return (
    <>
      {records.map(record => (
        <Card key={record.id}>
          <div className='card'>
            <img src={record.imageUrl} alt='' className='recordImage' />
            <div className='content'>
              <h1>{record.title}</h1>
              <p className='label'>{record.label}</p>
            </div>
            <div className='buttonsRow'>
              <FaCheckCircle
                className='successIcon'
                size={35}
                onClick={() => handleVerifyRecord(record.id)}
              />
              <FaTimesCircle
                className='failureIcon'
                size={35}
                onClick={() => handleBlockRecord(record.id)}
              />
            </div>
          </div>
        </Card>
      ))}
    </>
  );
}

export default Records;
