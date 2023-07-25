import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SelectBox from "../../../components/SelectBox/";
import { toast } from "react-hot-toast";
import {
  getLastWeekTransactionsAsync,
  setNewTransactionAsync,
} from "../../../redux/transactions/transactionsSlice";

const TransferInvoice = () => {
  const dispatch = useDispatch();

  const contacts = useSelector((state) => state.contacts.userContacts.data);
  const cards = useSelector((state) => state.cards.cards.data);

  const [formValues, setFormValues] = useState({
    title: "",
    amount: "",
  });
  const [selectedPerson, setSelectedPerson] = useState("");
  const [selectedCard, setSelectedCard] = useState("");
  const [selectedCardId, setSelectedCardId] = useState("");

  const formHandler = (e) =>
    setFormValues({ ...formValues, [e.target.name]: e.target.value });

  const selectedPersonHandler = (id) => {
    return selectedPerson == id ? setSelectedPerson("") : setSelectedPerson(id);
  };

  const returnCardsNames = (cards) => {
    return cards.map((card) => {
      return {
        fieldName: `${card.cardName}  |   $${card.cardBalance}`,
        _id: card._id,
      };
    });
  };

  const onSubmitHandler = (e) => {
    const data = {
      ...formValues,
      userId: selectedPerson,
      cardId: selectedCardId,
    };
    dispatch(setNewTransactionAsync(toast, data));
    dispatch(getLastWeekTransactionsAsync(toast));

    e.preventDefault();
  };

  const returnDataActive = (id) => {
    if (selectedPerson != "") {
      if (id == selectedPerson) {
        return true;
      } else {
        return false;
      }
    }
  };
  // item._id == selectedPerson  ? true : false
  return (
    <div className="transfer_invoice">
      <h4>Transfer</h4>
      <div className="transfer_invoice--list">
        {contacts != null &&
          contacts.map((item, index) => {
            return (
              <button
                data-active={returnDataActive(item._id)}
                onClick={() => selectedPersonHandler(item._id)}
                key={index}
                className="transfer_invoice--list__item"
              >
                <div className="img">
                  <img
                    src="https://www.realmeye.com/forum/uploads/default/optimized/3X/1/d/1d423de54aa8e5836c8fee9d038bf81f44c63b98_1_500x500.jpg"
                    alt="user"
                  />
                </div>
                <p>{item.name}</p>
              </button>
            );
          })}
        {contacts != null && contacts.length > 6 && (
          <div className="more">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 96 96"
              id="arrow"
            >
              <switch>
                <g>
                  <path d="M12 52h62.344L53.172 73.172a4 4 0 1 0 5.657 5.656l28-28a4 4 0 0 0 0-5.656l-28-28A3.989 3.989 0 0 0 56 16a4 4 0 0 0-2.828 6.828L74.344 44H12a4 4 0 0 0 0 8z"></path>
                </g>
              </switch>
            </svg>
          </div>
        )}
      </div>
      <form onSubmit={onSubmitHandler}>
        <label>
          <p>Başlıq</p>
          <input
            onChange={formHandler}
            value={formValues.title}
            name="title"
            type="text"
            placeholder="Başlığı daxil edin"
          />
        </label>
        <label>
          <p>Miqdar</p>
          <input
            onChange={formHandler}
            value={formValues.amount}
            name="amount"
            type="number"
            placeholder="0.00"
            min={0}
          />
        </label>
        <label>
          <p>Kart</p>
          <SelectBox
            option={selectedCard}
            setOption={setSelectedCard}
            options={cards == null ? [] : returnCardsNames(cards)}
            setId={setSelectedCardId}
          />
        </label>
        <div>
          <label>
            <input type="checkbox" />
            <span>Lorem ipsum dolor sit amet.</span>
          </label>
          <button type="submit">Göndər</button>
        </div>
      </form>
    </div>
  );
};

export default TransferInvoice;
