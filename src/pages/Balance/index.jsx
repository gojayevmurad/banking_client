import React from "react";
import "./balance.scss";
import MyBalance from "./components/MyBalance";
import TransferInvoice from "./components/TransferInvoice";
import TransferHistory from "./components/TransferHistory";
import InvoicesHistory from "./components/InvoicesHistory";

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
        <InvoicesHistory />
      </div>
    </div>
  );
};

export default Balance;
