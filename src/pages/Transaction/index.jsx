import React from "react";

import { Outlet } from "react-router-dom";

const Transaction = () => {
  return (
    <div className="transaction_page">
      <Outlet />
    </div>
  );
};

export default Transaction;