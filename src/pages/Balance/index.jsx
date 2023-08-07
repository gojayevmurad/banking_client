import React from "react";
import { useTranslation } from "react-i18next";

import "./balance.scss";

import MyBalance from "./components/MyBalance";
import TransferInvoice from "./components/TransferInvoice";
import TransferHistory from "./components/TransferHistory";
import CategoriesList from "./components/CategoriesList";

const Balance = () => {
  const { t } = useTranslation();
  return (
    <div className="balance_page">
      <h3>{t("balance")}</h3>
      <div className="balance_page--main">
        <MyBalance t={t} />
        <TransferInvoice t={t} />
      </div>
      <div className="balance_page--bottom">
        <TransferHistory t={t} />
        <CategoriesList t={t} />
      </div>
    </div>
  );
};

export default Balance;
