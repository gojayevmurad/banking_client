import React, { useState } from "react";
import "./cards.scss";
import CardsComp from "./components/Cards/Cards";
import CardList from "./components/CardList/CardList";
import { useSelector } from "react-redux";
const Cards = () => {
  // const [cardList, setCardList] = useState([
  //   {
  //     lastDigits: 1234,
  //     cvc: 123,
  //     expiry: "03/21",
  //     cardType: "Master",
  //     cardHolderName: "Rara Avis",
  //     cardBalance: 492356789,
  //     bgColor: "red",
  //     color: "white",
  //     cardName: "Main Card",
  //     status: false,
  //   },
  //   {
  //     lastDigits: 3425,
  //     cvc: 123,
  //     expiry: "04/21",
  //     cardType: "Visa",
  //     cardHolderName: "Mara Siva",
  //     cardBalance: 432454389,
  //     bgColor: "purple",
  //     color: "white",
  //     cardName: "Work Card",
  //     status: true,
  //   },
  //   {
  //     lastDigits: 6452,
  //     cvc: 123,
  //     expiry: "06/21",
  //     cardType: "Visa",
  //     cardHolderName: "Raraa Avis",
  //     cardBalance: 435456789,
  //     bgColor: "green",
  //     color: "white",
  //     cardName: "Debet Card",
  //     status: true,
  //   },
  //   {
  //     lastDigits: 1235,
  //     cvc: 123,
  //     expiry: "05/21",
  //     cardType: "Visa",
  //     cardHolderName: "Raradfa Avis",
  //     cardBalance: 312642789,
  //     bgColor: "grey",
  //     color: "white",
  //     cardName: "Loan Card",
  //     status: false,
  //   },
  //   {
  //     lastDigits: 7642,
  //     cvc: 123,
  //     expiry: "07/21",
  //     cardType: "Master",
  //     cardHolderName: "asdfasdf sdf",
  //     cardBalance: 895734289,
  //     bgColor: "black",
  //     color: "white",
  //     cardName: "Investing Card",
  //     status: true,
  //   },
  // ]);

  const cardList = useSelector((state) => state.cards.cards.data);

  return (
    <div className="cards_page">
      <div className="cards_quickview">
        <h3>Cards</h3>
        <CardsComp cardList={cardList ? cardList : []} />
        <CardList cardList={cardList ? cardList : []} />
      </div>
    </div>
  );
};

export default Cards;
