import React, { useEffect } from "react";
import { Card } from "antd-mobile";
import { useSelector, useDispatch } from "react-redux";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import "./css/researchers.css";
import { getResearchers } from "../../actions/index";

function Researchers() {
  const dispatch = useDispatch();
  const {
    researchers,
    adminActions: { isLoading },
  } = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(getResearchers());
  }, [dispatch]);

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
                <FaCheckCircle className='successIcon' size={35} />
                <FaTimesCircle className='failureIcon' size={35} />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </>
  );
}

export default Researchers;
