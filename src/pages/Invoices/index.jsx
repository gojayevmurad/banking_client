import React from "react";
import "./invoices.scss";

import ViewInvoices from "./components/ViewInvoices";
import LastestInvoice from "./components/LastestInvoice";

const Invoices = () => {
  return (
    <div className="invoices_page">
      <h3>Invoices</h3>
      <ViewInvoices />
      <LastestInvoice />
    </div>
  );
};

export default Invoices;
