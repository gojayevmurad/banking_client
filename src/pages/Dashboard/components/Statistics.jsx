import React from "react";
import ReactECharts from "echarts-for-react";

const Statistics = () => {
  const overviewOptions = {
    legend: {
      data: ["This Week", "Last Week"],
      right: 20,
      top: 5,
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "This Week",
        data: [75, 12, 90, 94, 29, 33, 50],
        type: "bar",
        smooth: true,
        itemStyle: {
          borderRadius: [30, 30, 0, 0],
          color: "#54c5eb",
        },
      },
      {
        name: "Last Week",
        data: [50, 102, 94, 43, 21, 51, 50],
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
          { value: 20, name: "Apple" },
          { value: 20, name: "Grapes" },
          { value: 20, name: "Pineapples" },
          { value: 20, name: "Oranges" },
          { value: 20, name: "Bananas" },
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
        <h4>Overview</h4>
        <ReactECharts option={overviewOptions} />
      </div>
      <div className="statistics--outcome">
        <h4>Outcome Categories</h4>
        <ReactECharts option={outcomeOptions} />
      </div>
    </div>
  );
};

export default Statistics;
