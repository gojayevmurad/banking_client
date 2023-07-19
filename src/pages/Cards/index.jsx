import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import CardItem from "../../components/CardItem/CardItem";
import CardList from "./components/CardList/CardList";
import CardsComp from "./components/Cards/Cards";
import "./cards.scss";
import SelectBox from "../../components/SelectBox";

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

const NewCardPopup = () => {
  const userInfoes = useSelector((state) => state.profile.userInfoes.data);

  const [yearOption, setYearOption] = useState(yearOption[0]);

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  return (
    <div className="new_card_popup">
      <div className="content">
        <Swiper
          pagination={pagination}
          modules={[Pagination]}
          className="new_card_slider"
        >
          {cardDesigns.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <CardItem
                  cardData={{
                    cardName: "Main",
                    holderName: [userInfoes.name + " " + userInfoes.surname],
                    validThru: "9/99",
                    status: true,
                    cardBalance: 123456789,
                    cardNumber: 123467891011121,
                    cvc: 999,
                    cardType: "visa",
                    ...cardDesigns[index],
                  }}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <SelectBox
          option={yearOption}
          options={yearOptions}
          setOption={setYearOption}
        />
      </div>
    </div>
  );
};

const Cards = () => {
  const cardList = useSelector((state) => state.cards.cards.data);

  return (
    <div className="cards_page">
      <div className="cards_quickview">
        <h3>Cards</h3>
        <NewCardPopup />
        <CardsComp cardList={cardList ? cardList : []} />
        <CardList cardList={cardList ? cardList : []} />
      </div>
    </div>
  );
};

export default Cards;
