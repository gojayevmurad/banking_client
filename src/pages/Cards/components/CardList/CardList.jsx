import React from "react";
import "./cardList.scss";
import { useDispatch } from "react-redux";
import { changeCardStatusAsync } from "../../../../redux/cards/cardsSlice";
import { toast } from "react-hot-toast";

const CardList = ({ cardList, t }) => {
  const dispatch = useDispatch();

  const cardStatusHandler = (id) => {
    dispatch(changeCardStatusAsync(toast, id));
  };

  return (
    <div className="card_list">
      <h4>{t("cardList")}</h4>
      <div className="card_list--content">
        {cardList.length &&
          cardList.map((card, index) => (
            <div key={index} className="card_list--content__item">
              <div className="main">
                <div data-bg={card.bgColor} className="img">
                  <div className="decoration"></div>
                  <div className="decoration-2"></div>
                </div>
                <div className="desc">
                  <p>{t("cardName")}</p>
                  <span>{card.cardName}</span>
                </div>
              </div>
              <div className="bank">
                <p>{t("bankName")}</p>
                <span>Bank ABC</span>
              </div>
              <div className="card_number">
                <p>{t("cardNumber")}</p>
                <span>•••• •••• •••• {card.cardNumber % 10000}</span>
              </div>
              <div className="valid_thru">
                <p>{t("validThru")}</p>
                <span>{card.validThru}</span>
              </div>
              <div className="name">
                <p>CVC</p>
                <span>•••</span>
              </div>
              <div className="actions">
                <button
                  onClick={() => cardStatusHandler(card._id)}
                  data-bg={card.status ? "red" : "green"}
                >
                  {card.status ? t("disable") : t("active")}
                </button>
                <button className="more">•••</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CardList;
