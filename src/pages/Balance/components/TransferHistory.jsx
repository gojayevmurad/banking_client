import React from "react";
import { formatDate, formatMoney, formatTime } from "../../../utils";
import logo from "../../../assets/user_photo.jpg";
import { useSelector } from "react-redux";

const TransferHistory = ({ t }) => {
  const lastestTransactions = useSelector(
    (state) => state.transactions.lastTransactions.data
  );
  const loading = useSelector(
    (state) => state.transactions.lastTransactions.loading
  );

  return (
    <div data-loading={loading} className="transfer_history">
      <h4>{t("lastestTransactions")}</h4>
      <div className="transfer_history--content">
        <div className="loading"></div>
        {lastestTransactions &&
          lastestTransactions.map((item, index) => {
            if (index > 4) return;

            const statusColor =
              item.status == false
                ? "red"
                : item.status == true
                ? "green"
                : "grey";

            const textColor = item.amount < 0 ? "red" : "green";

            return (
              <div key={index}>
                <div className="item_main">
                  <div className="icon">
                    <img src={item.profile_photo} alt="" />
                  </div>
                  <div className="person">
                    <p>{item.sender}</p>
                  </div>
                </div>
                <p className="operation_id">#{item._id}</p>
                <p className="amount" data-color={textColor}>
                  {item.amount < 0 ? (
                    <>-$ {formatMoney(Math.abs(item.amount))}</>
                  ) : (
                    <>$ {formatMoney(item.amount)}</>
                  )}
                </p>
                <div className="date">
                  <p>{formatDate(item.date)}</p>
                  <span>{formatTime(item.date)}</span>
                </div>
                <p data-color={statusColor} className="status">
                  {item.status == false
                    ? t("declined")
                    : item.status == true
                    ? t("completed")
                    : t("pending")}
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
