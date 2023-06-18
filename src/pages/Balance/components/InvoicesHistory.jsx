import React, { useState } from "react";

import logo from "../../../assets/user_photo.jpg";

const returnTrueIcon = (option) => {
  switch (option) {
    case -1:
      return (
        <div data-color="red" className="icon">
          <div data-bg="red" className="bg"></div>
          <p>!</p>
        </div>
      );
    case 0:
      return (
        <div data-color="grey" className="icon">
          <div data-bg="grey" className="bg"></div>
          <p>?</p>
        </div>
      );
    case 1:
      return (
        <div data-color="green" className="icon">
          <div data-bg="green" className="bg"></div>
          <p>+</p>
        </div>
      );
    default:
      break;
  }
};

const InvoicesHistory = () => {
  const [invoices, setInvoices] = useState({
    data: [
      {
        title: "Karen Hope",
        time: "1h ago",
        profile_photo: logo,
        status: -1,
      },
      {
        title: "Tony Soap",
        time: "1h ago",
        profile_photo: logo,
        status: -1,
      },
      {
        title: "Jordan Nico",
        time: "1h ago",
        profile_photo: logo,
        status: 0,
      },
      {
        title: "Samantha W.",
        time: "1h ago",
        profile_photo: logo,
        status: 0,
      },
      {
        title: "Jhonny A.",
        time: "1h ago",
        profile_photo: logo,
        status: 1,
      },
    ],
    total: 20,
  });

  return (
    <div className="invoices_history">
      <h4>Invoices Sent</h4>
      <div className="invoices_history--content">
        {invoices.data.map((item, index) => {
          return (
            <div key={index}>
              <div className="desc">
                <div className="img">
                  <img src={item.profile_photo} alt="pp" />
                </div>
                <div className="data">
                  <p>{item.title}</p>
                  <span>{item.time}</span>
                </div>
              </div>
              <div className="status">{returnTrueIcon(item.status)}</div>
            </div>
          );
        })}
      </div>
      {invoices.total > 5 && <button className="view_more">View more</button>}
    </div>
  );
};

export default InvoicesHistory;
