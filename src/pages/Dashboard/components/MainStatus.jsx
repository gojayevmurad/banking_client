import React, { useState } from "react";

import { formatMoney } from "../../../utils";

const MainStatus = () => {
  const totalTransaction = 3;
  const [lastestTransaction, setLastestTransaction] = useState([
    {
      title: "Samantha Wall",
      income: false,
      status: -1,
      amount: 70312,
      date: "09 Dec, 2020",
      time: "04:23:32 AM",
    },
    {
      title: "Samantha Wall",
      income: false,
      status: 1,
      amount: 50036,
      date: "25 Jan, 2021",
      time: "04:34:45 AM",
    },
    {
      title: "Kren Hopo",
      income: true,
      status: 0,
      amount: 30031,
      date: "15 Jul, 2022",
      time: "10:44:45 PM",
    },
  ]);

  const earningCategories = [
    {
      color: "purple",
      title: "Working Hard",
      amount: 50,
      target: 1000,
    },
    {
      color: "blue",
      title: "Side Project",
      amount: 70,
      target: 100,
    },
    {
      color: "orange",
      title: "Investment",
      amount: 1000,
      target: 2000,
    },
    {
      color: "red",
      title: "Digital Assets",
      amount: 40,
      target: 10000,
    },
  ];
  return (
    <div className="main_status">
      <div className="lastest_transaction">
        <h4>Lastest Transaction</h4>
        <div className="lastest_transaction--content">
          {lastestTransaction.map((item, index) => {
            return (
              <div key={index}>
                <div
                  className="icon"
                  data-bg={
                    item.status == -1
                      ? "red"
                      : item.status == 0
                      ? "grey"
                      : "green"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.01 0H6.878c-.54 0-.882.443-.882.982v.028c0 .55.33.99.88.99h8.553c.446 0 .668.543.353.857L.29 18.314a.988.988 0 0 0-.001 1.396v.001a.987.987 0 0 0 1.395 0L17.15 4.216a.497.497 0 0 1 .85.352v8.453c0 .544.45.974.996.974h.028c.545 0 .976-.43.976-.974V2.011A2 2 0 0 0 18.01 0"
                    ></path>
                  </svg>
                </div>
                <div className="person">
                  <p>{item.title}</p>
                  <span>Transfer</span>
                </div>
                <p className="amount">$ {formatMoney(item.amount)}</p>
                <div className="date">
                  <p>{item.date}</p>
                  <span>{item.time}</span>
                </div>
                <p
                  data-color={
                    item.status == -1
                      ? "red"
                      : item.status == 0
                      ? "grey"
                      : "green"
                  }
                  className="status"
                >
                  {item.status == -1
                    ? "Canceled"
                    : item.status == 0
                    ? "Pending"
                    : "Completed"}
                </p>
                <button className="more_btn">•••</button>
              </div>
            );
          })}
        </div>
        <div className="controls">
          <p>Showing 1-5 from 100 data</p>
          <div className="pagination">
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
          </div>
        </div>
      </div>
      <div className="earning_categories">
        <h4>Earning Categories</h4>
        <div className="earning_categories--content">
          {earningCategories.map((item, index) => {
            return (
              <div key={index} className="item">
                <div className="logo" data-color={item.color}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="45"
                    enableBackground="new 0 0 32 32"
                    viewBox="0 0 32 32"
                    id="usdc"
                  >
                    <circle cx="16" cy="16" r="14.5" fill="#42a5f5"></circle>
                    <path
                      fill="#455a64"
                      d="M16,31C7.73,31,1,24.27,1,16S7.73,1,16,1s15,6.73,15,15S24.27,31,16,31z M16,2
				C8.28,2,2,8.28,2,16s6.28,14,14,14s14-6.28,14-14S23.72,2,16,2z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M17.22,21.5h-2.44c-1.53,0-2.78-1.25-2.78-2.78V18.5c0-0.28,0.22-0.5,0.5-0.5
				s0.5,0.22,0.5,0.5v0.22c0,0.98,0.8,1.78,1.78,1.78h2.44c0.98,0,1.78-0.8,1.78-1.78c0-0.79-0.53-1.49-1.29-1.71l-3.69-1.05
				C12.83,15.61,12,14.51,12,13.28c0-1.53,1.25-2.78,2.78-2.78h2.44c1.53,0,2.78,1.25,2.78,2.78v0.22c0,0.28-0.22,0.5-0.5,0.5
				S19,13.78,19,13.5v-0.22c0-0.98-0.8-1.78-1.78-1.78h-2.44c-0.98,0-1.78,0.8-1.78,1.78c0,0.79,0.53,1.49,1.29,1.71l3.69,1.05
				c1.19,0.34,2.02,1.44,2.02,2.67C20,20.25,18.75,21.5,17.22,21.5z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M16 23.5c-.28 0-.5-.22-.5-.5v-2c0-.28.22-.5.5-.5s.5.22.5.5v2C16.5 23.28 16.28 23.5 16 23.5zM16 11.5c-.28 0-.5-.22-.5-.5V9c0-.28.22-.5.5-.5s.5.22.5.5v2C16.5 11.28 16.28 11.5 16 11.5zM12.5 26.39c-.06 0-.11-.01-.17-.03C7.95 24.81 5 20.64 5 16s2.95-8.81 7.33-10.36c.26-.09.54.04.64.3.09.26-.04.55-.3.64C8.68 7.99 6 11.78 6 16s2.68 8.01 6.67 9.42c.26.09.4.38.3.64C12.9 26.26 12.71 26.39 12.5 26.39zM19.5 26.39c-.21 0-.4-.13-.47-.33-.09-.26.04-.55.3-.64C23.32 24.01 26 20.22 26 16s-2.68-8.01-6.67-9.42c-.26-.09-.4-.38-.3-.64.09-.26.38-.4.64-.3C24.05 7.19 27 11.36 27 16s-2.95 8.81-7.33 10.36C19.61 26.38 19.56 26.39 19.5 26.39z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="title">{item.title}</p>
                  <div className="position">
                    <div
                      style={{
                        width: `${((item.amount / item.target) * 100).toFixed(
                          1
                        )}%`,
                      }}
                      data-color={item.color}
                    ></div>
                  </div>
                  <p>
                    ${formatMoney(item.amount)}{" "}
                    <span data-color={item.color}>
                      /from ${formatMoney(item.target)}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <button>View more</button>
      </div>
    </div>
  );
};

export default MainStatus;
