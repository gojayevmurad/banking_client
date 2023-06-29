import React from "react";
import { Outlet } from "react-router-dom";

const Cards = () => {
  return (
    <div className="cards_page">
      <h3>Cards</h3>
      <Outlet />
    </div>
  );
};

export default Cards;
