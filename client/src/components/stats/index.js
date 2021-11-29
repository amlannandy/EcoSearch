import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavBar, ActivityIndicator } from "antd-mobile";
import { FaChevronLeft } from "react-icons/fa";

import { getDiversity } from "../../actions/index";
import PieChart from "./pieChart";
import BarChart from "./barChart";

function Index({ history }) {
  const dispatch = useDispatch();
  const {
    stats,
    statsActions: { isLoading },
  } = useSelector(state => state.stats);

  useEffect(() => {
    dispatch(getDiversity());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className='loading-container'>
        <ActivityIndicator text='Loading...' size='large' />
      </div>
    );
  }

  return (
    <>
      <NavBar
        mode='light'
        leftContent={<FaChevronLeft onClick={() => history.goBack()} />}>
        Wildlife Data Analysis
      </NavBar>
      <PieChart data={stats} />
      <BarChart />
    </>
  );
}

export default Index;
