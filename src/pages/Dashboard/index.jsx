import React from "react";
import "./dashboard.scss";

import MainData from "./components/MainData";
import Statistics from "./components/Statistics";
import MainStatus from "./components/MainStatus";

const Dashboard = () => {
  const day = 365*5;
  let money = 100;

  for (let i = 0; i < day; i++) {
    money = money + money / 100;
  }

  setTimeout(() => {
    console.log(money);
  }, 3000);

  return (
    <div className="dashboard_page">
      <h3>Dashboard</h3>
      <MainData />
      <Statistics />
      <MainStatus />
    </div>
  );
};

export default Dashboard;
