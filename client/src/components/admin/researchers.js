import React, { useEffect } from "react";
import { Card, ActivityIndicator, Toast } from "antd-mobile";
import { useSelector, useDispatch } from "react-redux";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import "./css/researchers.css";
import {
  getResearchers,
  verifyResearcher,
  blockResearcher,
} from "../../actions/index";

function Researchers() {
  const dispatch = useDispatch();
  const {
    researchers,
    adminActions: { isLoading },
  } = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(getResearchers());
  }, [dispatch]);

  function handleVerifyResearcher(id) {
    dispatch(verifyResearcher(id, successCallback, errorCallback));
  }

  function handleBlockResearcher(id) {
    dispatch(blockResearcher(id, successCallback, errorCallback));
  }

  function successCallback(msg) {
    Toast.success(msg);
    dispatch(getResearchers());
  }

  function errorCallback(err) {
    Toast.fail(err);
    dispatch(getResearchers());
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
      {researchers.map(user => (
        <Card key={user.id}>
          <div className='card'>
            <img src={user.imageUrl} alt='' className='recordImage' />
            <div className='col'>
              <div className='content'>
                <h1>{user.name}</h1>
                <p>{user.email}</p>
              </div>
              <div className='buttonsRow'>
                <FaCheckCircle
                  className='successIcon'
                  size={35}
                  onClick={() => handleVerifyResearcher(user.id)}
                />
                <FaTimesCircle
                  className='failureIcon'
                  size={35}
                  onClick={() => handleBlockResearcher(user.id)}
                />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </>
  );
}

export default Researchers;
