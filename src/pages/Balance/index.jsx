import React from "react";
import "./balance.scss";
import MyBalance from "./components/MyBalance";
import TransferInvoice from "./components/TransferInvoice";
import TransferHistory from "./components/TransferHistory";
import CategoriesList from "./components/CategoriesList";

const Balance = () => {
  return (
    <div className="balance_page">
      <h3>Balance</h3>
      <div className="balance_page--main">
        <MyBalance />
        <TransferInvoice />
      </div>
      <div className="balance_page--bottom">
        <TransferHistory />
        <CategoriesList />
      </div>
    </div>
  );
};

export default Balance;
