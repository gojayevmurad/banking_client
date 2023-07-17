import React, { useState } from "react";
import "./transactionHistory.scss";
import { formatMoney } from "../../../utils";

const TransactionHistory = () => {
  const [transactionHistoryData, setTransactionHistory] = useState([
    {
      title: "Samanta William",
      email: "samanta9@gmail.com",
      _id: "INV-001-123456",
      status: "Sent",
      date: "March 25, 2021",
      service: "Server Maintenance",
      amount: 1000,
    },
    {
      title: "Tony Soap",
      email: "samanta9@gmail.com",
      _id: "INV-001-123456",
      status: "Unpaid",
      date: "March 25, 2021",
      service: "Cleaning Service",
      amount: 23443,
    },
    {
      title: "Johnny Ahmad",
      email: "samanta9@gmail.com",
      _id: "INV-001-123456",
      status: "Paid",
      date: "March 25, 2021",
      service: "Web Maintenance",
      amount: 34523,
    },
    {
      title: "Karen Hope",
      email: "samanta9@gmail.com",
      _id: "INV-001-123456",
      status: "Pending",
      date: "March 25, 2021",
      service: "Server Maintenance",
      amount: 23452,
    },
    {
      title: "Nilla Vita",
      email: "samanta9@gmail.com",
      _id: "INV-001-123456",
      status: "Paid",
      date: "March 25, 2021",
      service: "Server Maintenance",
      amount: 21342,
    },
  ]);
  return (
    <div className="transaction_history">
      <div className="transaction_history--actions">
        <h3 className="header">Transaction History</h3>
        <button>Download</button>
      </div>
      <div className="content">
        <div className="transaction_history--list">
          {transactionHistoryData.map((item, index) => (
            <div className="transaction_history--list__item" key={index}>
              <div className="transaction_history--list__item--main">
                <div className="img">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/00/500x500.jpg?20200619024959"
                    alt=""
                  />
                </div>
                <div>
                  <p>{item.title}</p>
                  <span>{item.email}</span>
                </div>
              </div>
              <div className="transaction_history--list__item--id">
                {item._id}
              </div>
              <div className="transaction_history--list__item--date">
                {item.date}
              </div>
              <div className="transaction_history--list__item--amount">
                $ {formatMoney(item.amount)}
              </div>
              <div className="transaction_history--list__item--service">
                {item.service}
              </div>
              <div className="transaction_history--list__item--status">
                {item.status}
              </div>
              <button className="more">•••</button>
            </div>
          ))}
        </div>
        <div className="transaction_history--bottom">
          <p>Showing 1-5 from 100 data</p>
          <div className="pagination">
            <div className="pagination--item">
              <button className="active">1</button>
            </div>
            <div className="pagination--item">
              <button>2</button>
            </div>
            <div className="pagination--item">
              <button>3</button>
            </div>
            <div className="pagination--item">
              <button>4</button>
            </div>
            <div className="pagination--item">
              <button>5</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
