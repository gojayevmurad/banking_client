import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SelectBox from "../../../components/SelectBox";
import { toast } from "react-hot-toast";
import {
  getLastTransactionsAsync,
  getLastWeekTransactionsAsync,
  setNewTransactionAsync,
} from "../../../redux/transactions/transactionsSlice";
import { formatMoney } from "../../../utils";
import { getCardsAsync } from "../../../redux/cards/cardsSlice";
import { getUserInfoesAsync } from "../../../redux/profile/profileSlice";

const TransferInvoice = ({ t }) => {
  const dispatch = useDispatch();

  const contacts = useSelector((state) => state.contacts.userContacts.data);
  const cards = useSelector((state) => state.cards.cards.data);
  const categories = useSelector(
    (state) => state.categories.expenseCategories.data
  );
  const isLoading = useSelector(
    (state) => state.transactions.newTransaction.loading
  );

  const [formValues, setFormValues] = useState({
    title: "",
    amount: "",
  });

  //#region transfer states
  const [selectedPerson, setSelectedPerson] = useState("");
  const [selectedCard, setSelectedCard] = useState("");
  const [selectedCardId, setSelectedCardId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  //#endregion transfer states

  const formHandler = (e) =>
    setFormValues({ ...formValues, [e.target.name]: e.target.value });

  const selectedPersonHandler = (id) => {
    return selectedPerson == id ? setSelectedPerson("") : setSelectedPerson(id);
  };

  const returnCardsNames = (cards) => {
    return cards.map((card) => {
      return {
        fieldName: `${card.cardName}  |   $${formatMoney(card.cardBalance)}`,
        _id: card._id,
      };
    });
  };

  const returnCategoryNames = (categories) => {
    return categories.map((category) => {
      return {
        fieldName: category.categoryName,
        _id: category._id,
      };
    });
  };

  const performSequentialActions = (data) => {
    return async (dispatch) => {
      await dispatch(setNewTransactionAsync(toast, data));

      await Promise.all([
        dispatch(getLastTransactionsAsync(toast)),
        dispatch(getLastWeekTransactionsAsync(toast)),
        dispatch(getCardsAsync(toast)),
        dispatch(getUserInfoesAsync(toast)),
      ]);
    };
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (
      formValues.amount == "" ||
      formValues.title == "" ||
      selectedCategoryId == ""
    ) {
      return toast.error("Formu doldurun");
    }

    const data = {
      ...formValues,
      userId: selectedPerson,
      cardId: selectedCardId,
      categoryId: selectedCategoryId,
    };
    dispatch(performSequentialActions(data));

    setFormValues({
      title: "",
      amount: "",
    });
    setSelectedPerson("");
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

  // #region loading user list data
  const loadingItem = (
    <button data-loading="true" className="transfer_invoice--list__item">
      <div className="img">
        <img
          src=""
          alt="user"
        />
      </div>
      <p></p>
    </button>
  );
  const loadingItems = [
    loadingItem,
    loadingItem,
    loadingItem,
    loadingItem,
    loadingItem,
  ];
  // #endregion loading user list data
  return (
    <div data-loading={isLoading} className="transfer_invoice">
      <h4>{t("transfer")}</h4>
      <div className="loading"></div>
      <div className="transfer_invoice--list">
        {contacts != null &&
          contacts.map((item, index) => {
            return (
              <button
                key={index}
                data-active={returnDataActive(item._id)}
                onClick={() => selectedPersonHandler(item._id)}
                className="transfer_invoice--list__item"
              >
                <div className="img">
                  <img src={item.profile_photo} alt="user" />
                </div>
                <p>{item.name}</p>
              </button>
            );
          })}
        {!(contacts != null) && loadingItems}
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
          <p>{t("title")}</p>
          <input
            onChange={formHandler}
            value={formValues.title}
            name="title"
            type="text"
            placeholder="Başlığı daxil edin"
          />
        </label>
        <label>
          <p>{t("title")}</p>
          <input
            onChange={formHandler}
            value={formValues.amount}
            name="amount"
            type="number"
            placeholder="0.00"
            min={0}
            step={0.01}
          />
        </label>
        <label>
          <p>{t("card")}</p>
          <SelectBox
            option={selectedCard}
            setOption={setSelectedCard}
            options={cards == null ? [] : returnCardsNames(cards)}
            setId={setSelectedCardId}
          />
        </label>
        <label>
          <p>{t("category")}</p>
          <SelectBox
            option={selectedCategory}
            options={
              categories == null
                ? []
                : [
                    ...returnCategoryNames(categories),
                    { fieldName: t("noCategory"), _id: "null" },
                  ]
            }
            setOption={setSelectedCategory}
            setId={setSelectedCategoryId}
          />
        </label>
        <div>
          <label>
            <input type="checkbox" />
            <span>Lorem ipsum dolor sit amet.</span>
          </label>
          <button type="submit">{t("send")}</button>
        </div>
      </form>
    </div>
  );
};

export default TransferInvoice;
