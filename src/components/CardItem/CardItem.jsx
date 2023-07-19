import React from "react";
import { formatMoney } from "../../utils";

import "./cardItem.scss";

const CardItem = ({ cardData, loading }) => {
  return (
    <div
      className="card_item"
      data-loading={loading ? "true" : "false"}
      data-bg={cardData?.bgColor}
      data-color={cardData?.color}
    >
      {!cardData.status && (
        <div className="blocked">
          <i className="fa-solid fa-lock"></i>
        </div>
      )}
      <div className="card_item--main">
        <div>
          <p>Balans</p>
          <span>
            ${cardData?.cardBalance && formatMoney(cardData.cardBalance)}
          </span>
        </div>
        <div className="circles">
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
      </div>
      <div children className="card_item--card_number">
        <p>
          •••• •••• •••• {cardData.cardNumber && cardData.cardNumber % 10000}
        </p>
      </div>
      <div className="columns">
        <div className="column"></div>
        <div className="column"></div>
      </div>
      <div className="card_item--data">
        <div>
          <p>Kart Sahibi</p>
          <span>{cardData?.holderName}</span>
        </div>
        <div>
          <p>Etibarlılıq</p>
          <span>{cardData?.validThru}</span>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
