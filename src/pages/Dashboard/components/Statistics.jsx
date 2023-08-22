import React from "react";
import ReactECharts from "echarts-for-react";
import { useSelector } from "react-redux";

const returnExpenseData = (data) => {
  if (data) {
    return data.map((item) => {
      return { value: item.amount, name: item.categoryName };
    });
  } else {
    return [];
  }
};

const returnLegendName = (data) => {
  if (data) {
    return data.map((item) => item.categoryName);
  }
  return [];
};

const Statistics = ({ incomes, expenses, t }) => {
  const overviewLoading = useSelector(
    (state) => state.transactions.lastWeek.loading
  );

  const outcomeCategories = useSelector(
    (state) => state.categories.expenseCategories.data
  );
  const outcomeLoading = useSelector(
    (state) => state.categories.expenseCategories.loading
  );

  const overviewOptions = {
    legend: {
      data: [t("expenses"), t("incomes")],
      right: 20,
      top: 5,
    },
    xAxis: {
      type: "category",
      data: [
        t("monday"),
        t("tuesday"),
        t("wednesday"),
        t("thursday"),
        t("friday"),
        t("saturday"),
        t("sunday"),
      ],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: t("expenses"),
        data: expenses.data,
        type: "bar",
        smooth: true,
        itemStyle: {
          borderRadius: [30, 30, 0, 0],
          color: "#54c5eb",
        },
      },
      {
        name: t("incomes"),
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
      data: returnLegendName(outcomeCategories),
      icon: "pin",
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        data: returnExpenseData(outcomeCategories),
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
        <h4>{t("overview")}</h4>
        <ReactECharts option={overviewOptions} showLoading={overviewLoading} />
      </div>
      <div className="statistics--outcome">
        <h4>{t("outcomeCategories")}</h4>
        {outcomeLoading.length ? (
          <ReactECharts option={outcomeOptions} showLoading={outcomeLoading} />
        ) : (
          <p className="statistics--outcome_empty">
            Xərc kateqoriyanız mövcud deyil
          </p>
        )}
      </div>
    </div>
  );
};

export default Statistics;
