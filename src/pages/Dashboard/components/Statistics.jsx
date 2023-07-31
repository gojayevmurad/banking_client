import React from "react";
import ReactECharts from "echarts-for-react";
import { useSelector } from "react-redux";

const Statistics = ({ incomes, expenses }) => {
  const chartsLoading = useSelector(
    (state) => state.transactions.lastWeek.loading
  );
  const overviewOptions = {
    legend: {
      data: ["Xərclər", "Gəlirlər"],
      right: 20,
      top: 5,
    },
    xAxis: {
      type: "category",
      data: ["B.e", "Ç.a", "Ç", "C.a", "C", "Şən", "Baz"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Xərclər",
        data: expenses.data,
        type: "bar",
        smooth: true,
        itemStyle: {
          borderRadius: [30, 30, 0, 0],
          color: "#54c5eb",
        },
      },
      {
        name: "Gəlirlər",
        data: incomes.data,
        type: "bar",
        smooth: true,
        itemStyle: {
          borderRadius: [30, 30, 0, 0],
          color: "#6160dc",
        },
      },
    ],
    tooltip: {
      trigger: "axis",
      textStyle: {
        color: "#6160dc",
      },
    },
    grid: { top: "20%", right: 40, bottom: 20, left: 40 },
  };
  const outcomeOptions = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      right: "15%",
      top: "30%",
      data: ["Apple", "Grapes", "Pineapples", "Oranges", "Bananas"],
      icon: "pin",
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        data: [
          { value: 134, name: "Apple" },
          { value: 203, name: "Grapes" },
          { value: 203, name: "Pineapples" },
          { value: 230, name: "Oranges" },
          { value: 520, name: "Bananas" },
        ],
        emphasis: {
          scale: true,
          scaleSize: 20,
        },
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
      },
    ],
  };

  return (
    <div className="statistics">
      <div className="statistics--overview">
        <h4>Ümumi baxış</h4>
        <ReactECharts option={overviewOptions} showLoading={chartsLoading} />
      </div>
      <div className="statistics--outcome">
        <h4>Xərc Kateqoriyaları</h4>
        <ReactECharts option={outcomeOptions}/>
      </div>
    </div>
  );
};

export default Statistics;
