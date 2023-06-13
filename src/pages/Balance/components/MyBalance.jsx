import React, { useState } from "react";
import { formatMoney } from "../../../utils/index";

const colors = {
  red: "#ff4a55",
  orange: "#ffb74a",
  blue: "#54c5eb",
  purple: "#6160dc",
  green: "#00a389",
};

const MyBalance = () => {
  const [data, setData] = useState({
    amount: 12345789,
    cartHolder: "Rara Avis",
    validThru: "03/21",
    lastDigits: 1234,
    target: 10000000,
  });
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

  const returnColor = (color) => colors[color];

  return (
    <div className="my_balance">
      <h5>My Balance</h5>
      <p className="money">${formatMoney(data.amount)}</p>
      <div className="desc">
        <div>
          <p>Card Holder</p>
          <span>{data.cartHolder}</span>
        </div>
        <div>
          <p>Valid Thru</p>
          <span>{data.validThru}</span>
        </div>
        <span>•••• •••• •••• {data.lastDigits}</span>
      </div>
      <div className="targets">
        {earningCategories.length &&
          earningCategories.map((item, index) => {
            return (
              <div key={index} className="target-item">
                <div
                  className="progress-bar js"
                  style={{
                    "--progress-percent": (item.amount / item.target) * 100,
                    "--progress-color": returnColor(item.color),
                  }}
                ></div>
                <div className="desc">
                  <p>{item.title}</p>
                  <span>
                    ${formatMoney(item.amount)}/{" "}
                    <span data-color={item.color}>
                      ${formatMoney(item.target)}
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MyBalance;
