import React from "react";
import { formatMoney } from "../../utils";

import "./cardItem.scss";

const CardItem = ({ cardData }) => {
  return (
    <div
      className="card_item"
      data-bg={cardData.bgColor}
      data-color={cardData.color}
    >
      <div>
        <div>
          <p>My Balance</p>
          <span>${formatMoney(cardData.cardBalance)}</span>
        </div>
        <div className="circles">
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
      </div>
      <div>
        <p>•••• •••• •••• {cardData.lastDigits}</p>
      </div>
      <div className="columns">
        <div className="column"></div>
        <div className="column"></div>
      </div>
      <div>
        <div>
          <p>Card Holder</p>
          <span>{cardData.cardHolderName}</span>
        </div>
        <div>
          <p>Valid Thru</p>
          <span>{cardData.expiry}</span>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
