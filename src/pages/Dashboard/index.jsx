import React from "react";
import "./dashboard.scss";

import MainData from "./components/MainData";
import Statistics from "./components/Statistics";
import MainStatus from "./components/MainStatus";

const Dashboard = () => {
  return (
    <div className="dashboard_page">
      <h3>Əsas</h3>
      <MainData />
      <Statistics />
      <MainStatus />
    </div>
  );
};

export default Dashboard;
