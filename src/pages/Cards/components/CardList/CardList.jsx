import React from "react";
import "./cardList.scss";
import { useDispatch } from "react-redux";
import { changeCardStatusAsync } from "../../../../redux/cards/cardsSlice";
import { toast } from "react-hot-toast";

const CardList = ({ cardList }) => {
  const dispatch = useDispatch();

  const cardStatusHandler = (id) => {
    dispatch(changeCardStatusAsync(toast, id));
  };

  return (
    <div className="card_list">
      <h4>Card List</h4>
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
                  <p>Card Name</p>
                  <span>{card.cardName}</span>
                </div>
              </div>
              <div className="bank">
                <p>Bank Name</p>
                <span>Bank ABC</span>
              </div>
              <div className="name">
                <p>Name</p>
                <span>{card.cardHolderName}</span>
              </div>
              <div className="card_number">
                <p>Card Number</p>
                <span>•••• •••• •••• {card.cardNumber % 10000}</span>
              </div>
              <div className="valid_thru">
                <p>Valid Thru</p>
                <span>{card.validThru}</span>
              </div>
              <div className="actions">
                <button
                  onClick={() => cardStatusHandler(card._id)}
                  data-bg={card.status ? "green" : "red"}
                >
                  {card.status ? "Active" : "Unactive"}
                </button>
                <button className="more">•••</button>
              </div>
            </div>
          ))}
      </div>
      <div className="card_list--bottom">
        <div>
          Showing 1-{cardList.length < 5 ? cardList.length : 5} from{" "}
          {cardList.length} data
        </div>
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
  );
};

export default CardList;
