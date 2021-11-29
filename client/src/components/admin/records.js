import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

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
    <div>
      <h1>Records</h1>
    </div>
  );
}

export default Records;
