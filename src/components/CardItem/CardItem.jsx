import React, { useState } from "react";
import { formatMoney } from "../../utils";

import "./cardItem.scss";

const CardItem = () => {
  const [balance, setBalance] = useState(12345789);

  const [cardData, setCardData] = useState({
    lastDigits: 1234,
    cardHolder: "Rara Avis",
    validThru: "03/21",
  });
  return (
    <div className="card_item">
      <div>
        <div>
          <p>My Balance</p>
          <span>${formatMoney(balance)}</span>
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
          <span>{cardData.cardHolder}</span>
        </div>
        <div>
          <p>Valid Thru</p>
          <span>{cardData.validThru}</span>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
