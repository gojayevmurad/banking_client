import React, { useState } from "react";
import CardItem from "../../../../components/CardItem/CardItem";
import "./cards.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper";
import "swiper/css";
import "swiper/css/effect-cards";
import { formatMoney } from "../../../../utils";

const Cards = ({cardList}) => {
  const limitPercent = 50;
  const [currentIndex, setCurrentIndex] = useState(0);


  const slideChangeHandler = (swiper) => {
    setCurrentIndex(swiper.activeIndex);
  };
  return (
    <div className="cards">
      <div className="list">
        <div>
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            onSwiper={(swiper) => {
              swiper.slideTo(Math.floor(cardList.length / 2));
              slideChangeHandler(swiper);
            }}
            onSlideChange={slideChangeHandler}
            className="mySwiper"
          >
            {cardList.map((cardData, index) => {
              return (
                <SwiperSlide key={index}>
                  <CardItem cardData={cardData} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="desc">
          <div>
            <p>Limit</p>
            <div className="range">
              <div
                style={{ width: `${limitPercent}%` }}
                className="progress"
              ></div>
            </div>
            <p>
              <span>${formatMoney(123456789)}</span> / from $
              {formatMoney(500000)}
            </p>
          </div>
          <button>
            <div className="icon">
              <i className="fa-solid fa-plus"></i>
            </div>
            Add new card
          </button>
        </div>
      </div>
      <div className="border"></div>
      <div className="card_details">
        <div>
          <div className="topup">
            <div>
              <h5>Top Up</h5>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
            <button>
              <i class="fa-solid fa-arrow-up"></i>
            </button>
          </div>
          <div className="withdraw">
            <div>
              <h5>Withdraw</h5>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
            <button>
              <i className="fa-solid fa-arrow-down"></i>
            </button>
          </div>
        </div>
        <div className="card_information">
          <h5>Card Information</h5>
          <div>
            <div>
              <p>Card Name</p>
              <span>{cardList[currentIndex].cardName}</span>
            </div>
            <div>
              <p>Card Number</p>
              <span>•••• •••• •••• {cardList[currentIndex].lastDigits}</span>
            </div>
            <div>
              <p>Bank</p>
              <span>Bank Info</span>
            </div>
            <div>
              <p>Name</p>
              <span>{cardList[currentIndex].cardHolderName}</span>
            </div>
            <div>
              <p>Valid Thru</p>
              <span>{cardList[currentIndex].expiry}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
