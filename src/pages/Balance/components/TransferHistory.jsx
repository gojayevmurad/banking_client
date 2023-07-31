import React, { useState } from "react";
import { formatMoney } from "../../../utils";
import logo from "../../../assets/user_photo.jpg";

const TransferHistory = () => {
  const [transferHistory, setTransferHistory] = useState([
    {
      title: "Samantha Wall",
      profile_photo: logo,
      income: false,
      amount: 123523,
      status: -1,
      operation_id: 1234567,
      date: "09 Dec, 2020",
      time: "04:23:32 AM",
    },
    {
      title: "Samantha Wall",
      profile_photo: logo,
      income: false,
      amount: 123594,
      status: 1,
      operation_id: 1234567,
      date: "25 Jan, 2021",
      time: "04:34:45 AM",
    },
    {
      title: "Kren Hopo",
      profile_photo: logo,
      income: true,
      amount: 8345924,
      status: 0,
      operation_id: 1234567,
      date: "15 Jul, 2022",
      time: "10:44:45 PM",
    },
  ]);

  return (
    <div className="transfer_history">
      <h4>Transfer Keçmişi</h4>
      <div className="transfer_history--content">
        {transferHistory.map((item, index) => {
          return (
            <div key={index}>
              <div className="item_main">
                <div className="icon">
                  <img src={item.profile_photo} alt="" />
                </div>
                <div className="person">
                  <p>{item.title}</p>
                </div>
              </div>
              <p className="operation_id">#{item.operation_id}</p>
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
                  ? "İmtina edildi"
                  : item.status == 0
                  ? "Gözlənilir"
                  : "Tamamlandı"}
              </p>
              <button className="more_btn">•••</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransferHistory;
