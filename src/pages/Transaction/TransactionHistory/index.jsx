import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

import "./transactionHistory.scss";

import { formatDate, formatMoney } from "../../../utils";
import {
  acceptingTransactionAsync,
  getPendingTransactionsAsync,
  getTransactionsHistoryAsync,
  rejectTransactionAsync,
} from "../../../redux/transactions/transactionsSlice";

import Loading from "../../../components/Loading";
import Pagination from "../../../components/Pagination";
import Checkbox from "../../../components/Checkbox";
import SelectBox from "../../../components/SelectBox";

const returnCardsOptions = (cards) => {
  if (cards) {
    return cards.map((card) => {
      return {
        fieldName: card.cardName,
        _id: card._id,
      };
    });
  }

  return [];
};

const ListItem = ({ item, isPending, t }) => {
  const dispatch = useDispatch();

  const cardsList = useSelector((state) => state.cards.cards.data);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState("");
  const [selectedCardId, setSelectedCardId] = useState("");

  const acceptHandler = (id) => {
    if (selectedCardId.trim().length == 0) {
      return toast.error("Kart seçin");
    }
    dispatch(acceptingTransactionAsync(toast, id, selectedCardId));
    setShowPopup(false);
  };
  const rejectHandler = (id) => {
    dispatch(rejectTransactionAsync(toast, id));
    setShowPopup(false);
  };

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
          <img src={item.profile_photo} alt="" />
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
          ? t("completed")
          : item.status === false
          ? t("declined")
          : t("pending")}
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
              <div className="transfer_to">
                <p>{t("card")}</p>
                <SelectBox
                  option={selectedCard}
                  setOption={setSelectedCard}
                  options={returnCardsOptions(cardsList)}
                  setId={setSelectedCardId}
                />
              </div>
              <div className="actions">
                <button
                  onClick={() => rejectHandler(item._id)}
                  className="reject_transaction"
                >
                  {t("decline")}
                </button>
                <button
                  onClick={() => acceptHandler(item._id)}
                  className="accept_transaction"
                >
                  {t("accept")}
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
  const { t } = useTranslation();

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
        <h3 className="header">{t("transactionHistory")}</h3>
        <div>
          <p>{t("showPendings")}</p>
          <Checkbox setValue={setShowPendings} value={showPendings} />
        </div>
      </div>
      <div className="content">
        <div className="transaction_history--list">
          <div className="transaction_history--list__item header ">
            <div className="transaction_history--list__item--main">
              <div>
                <p>{t("recieverSender")}</p>
              </div>
            </div>
            <div className="transaction_history--list__item--id">
              {t("transactionId")}
            </div>
            <div className="transaction_history--list__item--date">Tarix</div>
            <div className="transaction_history--list__item--amount">
              {t("amount")}
            </div>
            <div className="transaction_history--list__item--service">
              {t("title")}
            </div>
            <div className="transaction_history--list__item--status">
              {t("status")}
            </div>
          </div>
          {showPendings &&
            pendingTransactionsData &&
            pendingTransactionsData.map((item, index) => (
              <ListItem
                key={index}
                item={{ ...item, status: "Pending" }}
                isPending={true}
                t={t}
              />
            ))}
          {!showPendings &&
            transactionHistoryData.data &&
            transactionHistoryData.data.map((item, index) => (
              <ListItem t={t} key={index} item={item} isPending={false} />
            ))}
        </div>
        <div className="transaction_history--bottom">
          <p></p>
          {!showPendings &&
            transactionHistoryData.total > 5 &&
            paginationHistory.content}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
