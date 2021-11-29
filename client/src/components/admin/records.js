import React, { useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "antd-mobile";

import "./css/records.css";
import { getRecords } from "../../actions/index";

function Records() {
  const dispatch = useDispatch();
  const {
    records,
    adminActions: { isLoading },
  } = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(getRecords());
  }, [dispatch]);

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
              <FaCheckCircle className='successIcon' size={35} />
              <FaTimesCircle className='failureIcon' size={35} />
            </div>
          </div>
        </Card>
      ))}
    </>
  );
}

export default Records;
