import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

import "./cards.scss";

import { newCardAsync } from "../../redux/cards/cardsSlice";

import CardItem from "../../components/CardItem/CardItem";
import CardList from "./components/CardList/CardList";
import CardsComp from "./components/Cards/Cards";
import SelectBox from "../../components/SelectBox";
import Loading from "../../components/Loading";

const cardDesigns = [
  {
    bgColor: "black",
    color: "white",
    data: "blackCard",
  },
  {
    bgColor: "purple",
    color: "white",
    data: "purpleCard",
  },
  {
    bgColor: "red",
    color: "white",
    data: "redCard",
  },
  {
    bgColor: "green",
    color: "white",
    data: "greenCard",
  },
  {
    bgColor: "grey",
    color: "white",
    data: "greyCard",
  },
];

const yearOptions = [2, 3, 4, 5];

const NewCardPopup = ({ visible, setVisible, t }) => {
  const dispatch = useDispatch();

  const userInfoes = useSelector((state) => state.profile.userInfoes.data);
  const [yearOption, setYearOption] = useState(yearOptions[0]);
  const [cardName, setCardName] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideChangeHandler = (swiper) => {
    setCurrentIndex(swiper.activeIndex);
  };

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  const submitHandler = (e) => {
    const values = {
      cardName,
      holderName: userInfoes?.name + " " + userInfoes?.surname,
      year: yearOption,
      cardType: "Visa",
      cardDesign: cardDesigns[currentIndex].data,
    };
    dispatch(newCardAsync(toast, values));

    //#region reset form
    setCardName("");
    setVisible(false);
    //#endregion
    e.preventDefault();
  };

  return (
    <div className="new_card_popup" data-visible={visible}>
      <div onMouseDown={() => setVisible(!visible)} className="layout"></div>
      <div className="content">
        <Swiper
          pagination={pagination}
          modules={[Pagination]}
          className="new_card_slider"
          onSwiper={slideChangeHandler}
          onSlideChange={slideChangeHandler}
        >
          {cardDesigns.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <CardItem
                  cardData={{
                    cardName: "Main",
                    holderName: [userInfoes?.name + " " + userInfoes?.surname],
                    validThru:
                      new Date().getMonth() + 1 + "/" + (23 + yearOption),
                    status: true,
                    cardBalance: 123456789,
                    cardNumber: 123467891011121,
                    cvc: 999,
                    cardType: "visa",
                    ...item,
                  }}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>

        <form onSubmit={submitHandler}>
          <label>
            <p>{t("name")} : </p>
            <input type="text" name="name" value={userInfoes?.name} disabled />
          </label>
          <label>
            <p>{t("surname")} : </p>
            <input
              type="text"
              name="surname"
              value={userInfoes?.surname}
              disabled
            />
          </label>
          <label>
            <p>{t("cardName")} : </p>
            <input
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              type="text"
              autoComplete="disabled"
            />
          </label>
          <label>
            <p>{t("note")} : </p>
            <input type="text" name="orderNote" />
          </label>
          <label>
            <p>
              {t("duration")} ({t("year")}) :
            </p>
            <SelectBox
              option={yearOption}
              options={yearOptions}
              setOption={setYearOption}
            />
          </label>
          <button type="submit">{t("completeOrder")}</button>
        </form>
      </div>
    </div>
  );
};

const Cards = () => {
  const { t } = useTranslation();

  const cardList = useSelector((state) => state.cards.cards.data);
  const loadingState = useSelector(
    (state) =>
      state.cards.newCard.loading || state.cards.changeCardStatus.loading
  );

  const [showNewCardPopup, setShowNewCardPopup] = useState(false);

  return (
    <div className="cards_page">
      <div className="cards_quickview">
        <h3>{t("cards")}</h3>
        <NewCardPopup
          setVisible={setShowNewCardPopup}
          visible={showNewCardPopup}
          t={t}
        />
        {loadingState && <Loading />}
        <CardsComp
          setShowNewCardPopup={setShowNewCardPopup}
          cardList={cardList ? cardList : []}
          t={t}
        />
        <CardList t={t} cardList={cardList ? cardList : []} />
      </div>
    </div>
  );
};

export default Cards;
