import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import "./transactionHistory.scss";
import { formatDate, formatMoney } from "../../../utils";
import { getTransactionsHistoryAsync } from "../../../redux/transactions/transactionsSlice";

const TransactionHistory = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactionsHistoryAsync(toast));
  }, []);

  // const [transactionHistoryData, setTransactionHistory] = useState([

  //   {
  //     title: "Tony Soap",
  //     email: "samanta9@gmail.com",
  //     _id: "INV-001-123456",
  //     status: "Unpaid",
  //     date: "March 25, 2021",
  //     service: "Cleaning Service",
  //     amount: 23443,
  //   },
  //   {
  //     title: "Tony Soap",
  //     email: "samanta9@gmail.com",
  //     _id: "INV-001-123456",
  //     status: "Unpaid",
  //     date: "March 25, 2021",
  //     service: "Cleaning Service",
  //     amount: 23443,
  //   },
  //   {
  //     title: "Johnny Ahmad",
  //     email: "samanta9@gmail.com",
  //     _id: "INV-001-123456",
  //     status: "Paid",
  //     date: "March 25, 2021",
  //     service: "Web Maintenance",
  //     amount: 34523,
  //   },
  //   {
  //     title: "Karen Hope",
  //     email: "samanta9@gmail.com",
  //     _id: "INV-001-123456",
  //     status: "Pending",
  //     date: "March 25, 2021",
  //     service: "Server Maintenance",
  //     amount: 23452,
  //   },
  //   {
  //     title: "Nilla Vita",
  //     email: "samanta9@gmail.com",
  //     _id: "INV-001-123456",
  //     status: "Paid",
  //     date: "March 25, 2021",
  //     service: "Server Maintenance",
  //     amount: 21342,
  //   },
  // ]);
  //   {
  //     title: "Samanta William",
  //     email: "samanta9@gmail.com",
  //     _id: "INV-001-123456",
  //     status: "Sent",
  //     date: "March 25, 2021",
  //     service: "Server Maintenance",
  //     amount: 1000,
  //   },

  const transactionHistoryData = useSelector(
    (state) => state.transactions.transactionHistory
  );
  return (
    <div className="transaction_history">
      <div className="transaction_history--actions">
        <h3 className="header">Transaction History</h3>
        <button>Download</button>
      </div>
      <div className="content">
        <div className="transaction_history--list">
          <div className="transaction_history--list__item header ">
            <div className="transaction_history--list__item--main">
              <div>
                <p>Alıcı/Göndərən</p>
              </div>
            </div>
            <div className="transaction_history--list__item--id">
              Tranzaksiya İD
            </div>
            <div className="transaction_history--list__item--date">Tarix</div>
            <div className="transaction_history--list__item--amount">
              Məbləğ
            </div>
            <div className="transaction_history--list__item--service">
              Başlıq
            </div>
            <div className="transaction_history--list__item--status">
              Status
            </div>
          </div>
          {transactionHistoryData.data &&
            transactionHistoryData.data.length &&
            transactionHistoryData.data.map((item, index) => (
              <div className="transaction_history--list__item" key={index}>
                <div className="transaction_history--list__item--main">
                  <div className="img">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/0/00/500x500.jpg?20200619024959"
                      alt=""
                    />
                  </div>
                  <div>
                    <p>{item.sender}</p>
                    <span>{item.email}</span>
                  </div>
                </div>
                <div className="transaction_history--list__item--id">
                  {item._id}
                </div>
                <div className="transaction_history--list__item--date">
                  {formatDate(item.date)}
                </div>
                <div className="transaction_history--list__item--amount">
                  $ {formatMoney(item.amount)}
                </div>
                <div className="transaction_history--list__item--service">
                  {item.title}
                </div>
                <div
                  data-bg={
                    item.staus === true
                      ? "blue"
                      : item.status === false
                      ? "red"
                      : "grey"
                  }
                  className="transaction_history--list__item--status"
                >
                  {item.status === true
                    ? "Completed"
                    : item.status === false
                    ? "Declined"
                    : "Pending"}
                </div>
                <button className="more">•••</button>
              </div>
            ))}
        </div>
        <div className="transaction_history--bottom">
          <p>
            Showing 1-
            {transactionHistoryData.data &&
            transactionHistoryData.data.length > 5
              ? 5
              : transactionHistoryData.data &&
                transactionHistoryData.data.length}{" "}
            from{" "}
            {transactionHistoryData.data && transactionHistoryData.data.length}{" "}
            data
          </p>
          <div className="pagination">
            <div className="pagination--item">
              <button className="active">1</button>
            </div>
            {/* <div className="pagination--item">
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
