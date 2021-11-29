import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

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
    <div>
      <h1>Researchers</h1>
    </div>
  );
}

export default Researchers;
