import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavBar } from "antd-mobile";
import { FaChevronLeft } from "react-icons/fa";

import { getDiversity } from "../../actions/index";

function Index({ history }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiversity());
  }, [dispatch]);

  return (
    <>
      <NavBar
        mode='light'
        leftContent={<FaChevronLeft onClick={() => history.goBack()} />}>
        Wildlife Data Analysis
      </NavBar>
    </>
  );
}

export default Index;
