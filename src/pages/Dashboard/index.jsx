import React from "react";
import "./dashboard.scss";

import MainData from "./components/MainData";
import Statistics from "./components/Statistics";
import MainStatus from "./components/MainStatus";
import { useSelector } from "react-redux";

const getStatisticsData = (statistics) => {
  if (statistics == null) {
    return { data: [0, 0, 0, 0, 0, 0, 0], total: 0 };
  }
  const data = [];
  let total = 0;

  for (const property in statistics) {
    let amount = 0;
    statistics[property].forEach((item) => {
      amount += Math.abs(item.amount);
      total += Math.abs(item.amount);
    });
    data.push(amount);
  }
  return { data, total };
};

const Dashboard = () => {
  const statistics = useSelector((state) => state.transactions.lastWeek);

  const incomes = getStatisticsData(statistics.data?.weeklyIncome);
  const expenses = getStatisticsData(statistics.data?.weeklyExpense);

  return (
    <div className="dashboard_page">
      <h3>Əsas</h3>
      <MainData incomes={incomes} expenses={expenses} />
      <Statistics incomes={incomes} expenses={expenses} />
      <MainStatus />
    </div>
  );
};

export default Dashboard;
