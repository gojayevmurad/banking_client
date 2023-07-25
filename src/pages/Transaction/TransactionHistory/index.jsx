import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import "./transactionHistory.scss";
import { formatDate, formatMoney } from "../../../utils";
import {
  acceptingTransactionAsync,
  getPendingTransactionsAsync,
  getTransactionsHistoryAsync,
} from "../../../redux/transactions/transactionsSlice";
import Loading from "../../../components/Loading";
import Pagination from "../../../components/Pagination";
import Checkbox from "../../../components/Checkbox";

const ListItem = ({ item, isPending }) => {
  const dispatch = useDispatch();

  const [showPopup, setShowPopup] = useState(false);

  const acceptHandler = (id) => {
    dispatch(acceptingTransactionAsync(toast, id));
    setShowPopup(false);
  };
  const rejectHandler = () => {};

  const manipulateActions = (status) => {
    if (status == "Pending") {
      isPending && setShowPopup(true);
      !isPending && toast.error("Qarşı tərəfin əməliyyatı gözlənilir");
    }
  };

  return (
    <div className="transaction_history--list__item">
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
      <div className="transaction_history--list__item--id">{item._id}</div>
      <div className="transaction_history--list__item--date">
        {formatDate(item.date)}
      </div>
      <div className="transaction_history--list__item--amount">
        {item.amount < 0 ? (
          <p data-color="red">- $ {formatMoney(-item.amount)}</p>
        ) : (
          <p data-color="green">$ {formatMoney(item.amount)}</p>
        )}
      </div>
      <div className="transaction_history--list__item--service">
        {item.title}
      </div>
      <div
        data-show={showPopup}
        data-bg={
          item.status === true
            ? "green"
            : item.status === false
            ? "red"
            : isPending
            ? "purple"
            : "grey"
        }
        className="transaction_history--list__item--status"
        onMouseDown={() => manipulateActions(item.status)}
      >
        {item.status === true
          ? "Completed"
          : item.status === false
          ? "Declined"
          : "Pending"}
        {isPending && (
          <div className="pending_popup">
            <div
              className="pending_popup--overlay"
              onMouseDown={(e) => {
                e.stopPropagation();
                setShowPopup(false);
              }}
            ></div>
            <div className="pending_popup--content">
              <h3>Təsdiq</h3>
              <div className="data">
                <p>
                  <span>{item.sender}</span> adlı şəxsdən,"
                  <span>{item.title}</span>" başlığı altında göndərilən{" "}
                  <span>${item.amount}</span> məbləğindəki köçürməni :
                </p>
              </div>
              <div className="actions">
                <button
                  onClick={() => acceptHandler(item._id)}
                  className="accept_transaction"
                >
                  Qəbul et
                </button>
                <button
                  onClick={() => rejectHandler(item._id)}
                  className="reject_transaction"
                >
                  İmtina et
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <button className="more">•••</button>
    </div>
  );
};

const TransactionHistory = () => {
  const [showPendings, setShowPendings] = useState(false);

  const dispatch = useDispatch();

  const mainLoading = useSelector(
    (state) => state.transactions.transactionHistory.loading
  );

  const transactionHistoryData = useSelector(
    (state) => state.transactions.transactionHistory
  );

  const pendingTransactionsData = useSelector(
    (state) => state.transactions.pendingTransactions.data
  );

  const paginationHistory = Pagination({
    totalCount: transactionHistoryData.total,
    limit: 5,
  });

  useEffect(() => {
    dispatch(
      getTransactionsHistoryAsync(toast, {
        limit: 5,
        page: paginationHistory.activePage,
      })
    );
    dispatch(getPendingTransactionsAsync(toast));
  }, []);

  useEffect(() => {
    dispatch(
      getTransactionsHistoryAsync(toast, {
        limit: 5,
        page: paginationHistory.activePage,
      })
    );
  }, [paginationHistory.activePage]);

  useEffect(() => {
    paginationHistory.setActivePage(1);
  }, [showPendings]);

  return (
    <div className="transaction_history">
      {mainLoading && <Loading />}
      <div className="transaction_history--actions">
        <h3 className="header">Transaction History</h3>
        <div>
          <p>Show pendings</p>
          <Checkbox setValue={setShowPendings} value={showPendings} />
        </div>
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
          {showPendings &&
            pendingTransactionsData &&
            pendingTransactionsData.map((item, index) => (
              <ListItem
                key={index}
                item={{ ...item, status: "Pending" }}
                isPending={true}
              />
            ))}
          {!showPendings &&
            transactionHistoryData.data &&
            transactionHistoryData.data.map((item, index) => (
              <ListItem key={index} item={item} isPending={false} />
            ))}
        </div>
        <div className="transaction_history--bottom">
          <p>
            {/* Showing 1-
            {transactionHistoryData && transactionHistoryData.length > 5
              ? 5
              : transactionHistoryData && transactionHistoryData.length}{" "}
            from {transactionHistoryData && transactionHistoryData.length} data */}
          </p>
          {!showPendings && paginationHistory.content}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
