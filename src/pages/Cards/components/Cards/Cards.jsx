import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

import "swiper/css";
import "swiper/css/effect-cards";

import "./cards.scss";
import CardItem from "../../../../components/CardItem/CardItem";
import { formatMoney } from "../../../../utils";
import { changeCardLimitAsync } from "../../../../redux/cards/cardsSlice";

const Cards = ({ cardList, setShowNewCardPopup, t }) => {
  const dispatch = useDispatch();

  const [currentIndex, setCurrentIndex] = useState(0);

  const slideChangeHandler = (swiper) => {
    setCurrentIndex(swiper.activeIndex);
  };

  const cardLimitHandler = (id) => {
    dispatch(changeCardLimitAsync(toast, id));
  };

  return (
    <div className="cards">
      <div className="list">
        <button
          onClick={() => cardLimitHandler(cardList[currentIndex]._id)}
          className="set_limit"
        >
          {cardList.length > 0 &&
            cardList[currentIndex].status &&
            (cardList[currentIndex].limit.isActive ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 24 24"
                viewBox="0 0 24 24"
                className="disable-limit"
              >
                <path
                  d="M21.8218,14.1172C21.9307,13.4053,22,12.6948,22,12c0-1.459-0.2349-2.9248-0.6997-4.3613
    c-0.4907-1.4971-1.8394-2.6533-3.5171-3.0156C13.998,3.7969,10,3.7979,6.2188,4.6221C4.5391,4.9854,3.1904,6.1416,2.6982,7.6426
    C2.2349,9.0752,2,10.541,2,12s0.2349,2.9248,0.6997,4.3613c0.4907,1.4971,1.8394,2.6533,3.5171,3.0156
    c1.8809,0.4111,3.7925,0.6182,5.7007,0.6182c0.2268,0,0.4535-0.0118,0.6802-0.0178c0.3097,0.6152,0.7291,1.1656,1.2197,1.5939
    c0.0376,0.0381,0.1113,0.1133,0.2207,0.1885C15.0005,22.5596,16.2266,23,17.5,23c1.3379,0,2.6172-0.4795,3.5894-1.3398
    C22.3037,20.623,23,19.1064,23,17.5c0-0.8613-0.2036-1.7158-0.5918-2.4785C22.2288,14.6736,22.0226,14.3622,21.8218,14.1172z
     M6.6436,6.5762C8.396,6.1943,10.1982,6,12,6s3.604,0.1943,5.3584,0.5771c0.9888,0.2139,1.771,0.8594,2.04,1.6807
    C19.4781,8.5042,19.544,8.752,19.608,9H4.3918c0.0637-0.2468,0.1291-0.4934,0.2083-0.7383
    C4.8706,7.4365,5.6528,6.791,6.6436,6.5762z M6.6416,17.4229c-0.9888-0.2139-1.771-0.8594-2.04-1.6807
    C4.2021,14.5078,4,13.249,4,12c0-0.3329,0.0166-0.6664,0.0452-1h15.9095C19.9833,11.3336,20,11.6671,20,12
    c0,0.1973-0.0054,0.3955-0.0156,0.5947c-0.0345-0.0176-0.0713-0.0297-0.1061-0.0465c-0.0718-0.0348-0.1453-0.0642-0.2184-0.0958
    c-0.1524-0.0656-0.3066-0.1249-0.4642-0.1763c-0.0812-0.0265-0.1624-0.0516-0.2448-0.0742
    c-0.1626-0.0446-0.3273-0.0797-0.4939-0.1091c-0.0752-0.0133-0.1492-0.0299-0.225-0.04C17.9904,12.0206,17.7466,12,17.5,12
    c-1.6074,0-3.1235,0.6963-4.1489,1.8975C12.48,14.8828,12,16.1621,12,17.5c0,0.167,0.0073,0.332,0.0215,0.4951
    C10.231,17.9941,8.4185,17.8115,6.6416,17.4229z M19.7773,20.1514c-1.2188,1.0762-3.2607,1.0986-4.4966,0.04
    c-0.0249-0.0215-0.0513-0.042-0.0781-0.0615c-0.0029-0.002-0.0068-0.0059-0.0122-0.0107c-0.459-0.4033-0.8022-0.915-1.0024-1.5059
    C14.0635,18.2754,14,17.9014,14,17.5c0-0.8496,0.3018-1.6582,0.8604-2.291c1.0942-1.2812,3.1108-1.585,4.5557-0.6328
    c0.2183,0.1377,0.4189,0.3086,0.5967,0.5088c0.0278,0.0312,0.0581,0.0605,0.0903,0.0889l0.1113,0.1299
    c0.1528,0.1816,0.293,0.3955,0.4146,0.6299C20.8716,16.4111,21,16.9531,21,17.5C21,18.5205,20.5591,19.4834,19.7773,20.1514z"
                ></path>
                <path d="M8 14H7c-.5522 0-1 .4473-1 1s.4478 1 1 1h1c.5522 0 1-.4473 1-1S8.5522 14 8 14zM18.293 16.293L17 17.5859l-.293-.293c-.3906-.3906-1.0234-.3906-1.4141 0s-.3906 1.0234 0 1.4141l1 1C16.4883 19.9023 16.7441 20 17 20s.5117-.0977.707-.293l2-2c.3906-.3906.3906-1.0234 0-1.4141S18.6836 15.9023 18.293 16.293z"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 24 24"
                viewBox="0 0 24 24"
                className="enable-limit"
              >
                <path
                  d="M19.2749,15.666c-0.3906-0.3906-1.0234-0.3906-1.4141,0l-0.4124,0.4124l-0.3538-0.3538
			c-0.3906-0.3906-1.0234-0.3906-1.4141,0s-0.3906,1.0234,0,1.4141l0.3539,0.354l-0.3686,0.3687
			c-0.3906,0.3906-0.3906,1.0234,0,1.4141c0.1953,0.1953,0.4512,0.293,0.707,0.293s0.5117-0.0977,0.707-0.293l0.3684-0.3685
			l0.4124,0.4124c0.1953,0.1953,0.4512,0.293,0.707,0.293s0.5117-0.0977,0.707-0.293c0.3906-0.3906,0.3906-1.0234,0-1.4141
			l-0.4125-0.4126l0.4125-0.4126C19.6655,16.6895,19.6655,16.0566,19.2749,15.666z"
                ></path>
                <path
                  d="M21.8218,14.1172C21.9307,13.4053,22,12.6948,22,12c0-1.459-0.2349-2.9248-0.6997-4.3613
			c-0.4907-1.4971-1.8394-2.6533-3.5171-3.0156C13.998,3.7969,10,3.7979,6.2188,4.6221C4.5391,4.9854,3.1904,6.1416,2.6982,7.6426
			C2.2349,9.0752,2,10.541,2,12s0.2349,2.9248,0.6997,4.3613c0.4907,1.4971,1.8394,2.6533,3.5171,3.0156
			c1.8809,0.4111,3.7925,0.6182,5.7007,0.6182c0.2268,0,0.4535-0.0118,0.6802-0.0178c0.3097,0.6152,0.7291,1.1656,1.2197,1.5939
			c0.0376,0.0381,0.1113,0.1133,0.2207,0.1885C15.0005,22.5596,16.2266,23,17.5,23c1.3379,0,2.6172-0.4795,3.5894-1.3398
			C22.3037,20.623,23,19.1064,23,17.5c0-0.8613-0.2036-1.7158-0.5918-2.4785C22.2288,14.6736,22.0226,14.3622,21.8218,14.1172z
			 M6.6436,6.5762C8.396,6.1943,10.1982,6,12,6s3.604,0.1943,5.3584,0.5771c0.9888,0.2139,1.771,0.8594,2.04,1.6807
			C19.4781,8.5042,19.544,8.752,19.608,9H4.3918c0.0637-0.2468,0.1291-0.4934,0.2083-0.7383
			C4.8706,7.4365,5.6528,6.791,6.6436,6.5762z M6.6416,17.4229c-0.9888-0.2139-1.771-0.8594-2.04-1.6807
			C4.2021,14.5078,4,13.249,4,12c0-0.3329,0.0166-0.6664,0.0452-1h15.9095C19.9833,11.3336,20,11.6671,20,12
			c0,0.1973-0.0054,0.3955-0.0156,0.5947c-0.0345-0.0176-0.0713-0.0297-0.1061-0.0465c-0.0718-0.0348-0.1453-0.0642-0.2184-0.0958
			c-0.1524-0.0656-0.3066-0.1249-0.4642-0.1763c-0.0812-0.0265-0.1624-0.0516-0.2448-0.0742
			c-0.1626-0.0446-0.3273-0.0797-0.4939-0.1091c-0.0752-0.0133-0.1492-0.0299-0.225-0.04C17.9904,12.0206,17.7466,12,17.5,12
			c-1.6074,0-3.1235,0.6963-4.1489,1.8975C12.48,14.8828,12,16.1621,12,17.5c0,0.167,0.0073,0.332,0.0215,0.4951
			C10.2363,17.9941,8.4185,17.8115,6.6416,17.4229z M19.7773,20.1514c-1.2183,1.0762-3.2603,1.0986-4.4966,0.04
			c-0.0249-0.0215-0.0513-0.042-0.0781-0.0615c-0.0029-0.002-0.0068-0.0059-0.0122-0.0107c-0.459-0.4033-0.8022-0.915-1.0024-1.5059
			C14.0635,18.2754,14,17.9014,14,17.5c0-0.8496,0.3018-1.6582,0.8604-2.291c1.0942-1.2812,3.1108-1.585,4.5557-0.6328
			c0.2183,0.1377,0.4189,0.3086,0.5967,0.5088c0.0278,0.0312,0.0581,0.0605,0.0903,0.0889l0.1113,0.1299
			c0.1528,0.1816,0.293,0.3955,0.4146,0.6299C20.8716,16.4111,21,16.9531,21,17.5C21,18.5205,20.5591,19.4834,19.7773,20.1514z"
                ></path>
                <path d="M8,14H7c-0.5522,0-1,0.4473-1,1s0.4478,1,1,1h1c0.5522,0,1-0.4473,1-1S8.5522,14,8,14z"></path>
              </svg>
            ))}
        </button>
        <div className="list_slider">
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
            {cardList.length &&
              cardList.map((cardData, index) => {
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
            {cardList.length > 0 &&
              cardList[currentIndex].status &&
              cardList[currentIndex].limit.isActive && (
                <div>
                  <p>{t("limit")}</p>
                  <div className="range">
                    <div
                      style={{
                        width: `${
                          (cardList[currentIndex].limit.amount /
                            cardList[currentIndex].limit.target) *
                          100
                        }%`,
                      }}
                      className="progress"
                    ></div>
                  </div>
                  <p>
                    <span>
                      ${formatMoney(cardList[currentIndex].limit.amount)}
                    </span>{" "}
                    / {t("from")} $
                    {formatMoney(cardList[currentIndex].limit.target)}
                  </p>
                </div>
              )}
          </div>
          <button onClick={() => setShowNewCardPopup((b) => (b = !b))}>
            <div className="icon">
              <i className="fa-solid fa-plus"></i>
            </div>
            {t("newCard")}
          </button>
        </div>
      </div>
      <div className="border"></div>
      {cardList.length && (
        <div
          data-active={cardList[currentIndex].status}
          className="card_details"
        >
          <div>
            <div className="topup">
              <div>
                <h5>Top Up</h5>
                <p>Lorem ipsum dolor sit amet consectetur.</p>
              </div>
              <button>
                <i className="fa-solid fa-arrow-up"></i>
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
            <h5>{t("cardInformation")}</h5>
            <div>
              <div>
                <p>{t("cardName")}</p>
                <span>{cardList[currentIndex].cardName}</span>
              </div>
              <div>
                <p>{t("cardNumber")}</p>
                <span>
                  •••• •••• •••• {cardList[currentIndex].cardNumber % 10000}
                </span>
              </div>
              <div>
                <p>CVC</p>
                <span>•••</span>
              </div>
              <div>
                <p>{t("name")}</p>
                <span>{cardList[currentIndex].holderName}</span>
              </div>
              <div>
                <p>{t("validThru")}</p>
                <span>{cardList[currentIndex].validThru}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cards;
