import React, { useState } from "react";
import "./dashboard.scss";

import MainData from "./components/MainData";
import Statistics from "./components/Statistics";

const Dashboard = () => {
  return (
    <div className="dashboard_page">
      <h3>Dashboard</h3>
      <MainData />
      <Statistics />
    </div>
  );
};

export default Dashboard;
