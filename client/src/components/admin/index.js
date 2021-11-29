import React, { Component, Fragment } from "react";
import { Tabs, NavBar } from "antd-mobile";
import { FaChevronLeft } from "react-icons/fa";

import Records from "./records";
import Researchers from "./researchers";

const tabs = [{ title: "Researchers" }, { title: "Records" }];

class Index extends Component {
  render() {
    const { history } = this.props;

    return (
      <Fragment>
        <NavBar
          mode='light'
          leftContent={<FaChevronLeft onClick={() => history.goBack()} />}>
          Admin Panel
        </NavBar>
        <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false}>
          <Researchers />
          <Records />
        </Tabs>
      </Fragment>
    );
  }
}

export default Index;
