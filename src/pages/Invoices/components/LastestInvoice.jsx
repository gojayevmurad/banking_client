import React, { useState } from "react";
import logo from "../../../assets/user_photo.jpg";

const LastestInvoice = () => {
  const [lastestInvoice, setLastestInvoice] = useState([
    {
      title: "Samanta William",
      email: "samanta9@gmail.com",
      _id: "INV-001-123456",
      status: "Sent",
      date: "March 25, 2021",
      service: "Server Maintenance",
    },
    {
      title: "Tony Soap",
      email: "samanta9@gmail.com",
      _id: "INV-001-123456",
      status: "Unpaid",
      date: "March 25, 2021",
      service: "Cleaning Service",
    },
    {
      title: "Johnny Ahmad",
      email: "samanta9@gmail.com",
      _id: "INV-001-123456",
      status: "Paid",
      date: "March 25, 2021",
      service: "Web Maintenance",
    },
    {
      title: "Karen Hope",
      email: "samanta9@gmail.com",
      _id: "INV-001-123456",
      status: "Pending",
      date: "March 25, 2021",
      service: "Server Maintenance",
    },
    {
      title: "Nilla Vita",
      email: "samanta9@gmail.com",
      _id: "INV-001-123456",
      status: "Paid",
      date: "March 25, 2021",
      service: "Server Maintenance",
    },
  ]);
  const [totalCount, setTotalCount] = useState(5);

  return (
    <div className="lastest_invoice">
      <div className="lastest_invoice--content">
        <h4>Son Fakturalar</h4>
        <table>
          <tr className="head">
            <td>Alıcı</td>
            <td>Faktura</td>
            <td>Status</td>
            <td>Tarix</td>
            <td>Servis</td>
            <td></td>
          </tr>
          {lastestInvoice.map((item, index) => {
            return (
              <tr key={index}>
                <td className="person">
                  <img src={logo} alt="" />
                  <div>
                    <p>{item.title}</p>
                    <span>{item.email}</span>
                  </div>
                </td>
                <td className="id">{item._id}</td>
                <td className="status">{item.status}</td>
                <td className="date">{item.date}</td>
                <td className="service">{item.service}</td>
                <td className="actions">
                  <button className="print">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      enableBackground="new 0 0 24 24"
                      viewBox="0 0 24 24"
                      id="printer"
                      height={23}
                      width={23}
                    >
                      <path d="M7,9.5c-0.8284302,0-1.5,0.6715698-1.5,1.5s0.6715698,1.5,1.5,1.5c0.828064-0.0009155,1.4990845-0.671936,1.5-1.5C8.5,10.1715698,7.8284302,9.5,7,9.5z M7,11.5c-0.276123,0-0.5-0.223877-0.5-0.5s0.223877-0.5,0.5-0.5c0.2759399,0.0005493,0.4994507,0.2240601,0.5,0.5C7.5,11.276123,7.276123,11.5,7,11.5z M19.5,6H18V2.5c0-0.0001831,0-0.0003662,0-0.0006104C17.9998169,2.2234497,17.776001,1.9998169,17.5,2h-11C6.4998169,2,6.4996338,2,6.4993896,2C6.2234497,2.0001831,5.9998169,2.223999,6,2.5V6H4.5C3.119812,6.0012817,2.0012817,7.119812,2,8.5V15c0.0018311,1.6561279,1.3438721,2.9981689,3,3h1v3.5c0,0.0001831,0,0.0003662,0,0.0005493C6.0001831,21.7765503,6.223999,22.0001831,6.5,22h11c0.0001831,0,0.0003662,0,0.0006104,0C17.7765503,21.9998169,18.0001831,21.776001,18,21.5V18h1c1.6561279-0.0018311,2.9981689-1.3438721,3-3V8.5C21.9987183,7.119812,20.880188,6.0012817,19.5,6z M7,3h10v3H7V3z M17,21H7v-6h10V21z M21,15c-0.0014038,1.1040039-0.8959961,1.9985962-2,2h-1v-2.5c0-0.0001831,0-0.0003662,0-0.0006104C17.9998169,14.2234497,17.776001,13.9998169,17.5,14h-11c-0.0001831,0-0.0003662,0-0.0006104,0C6.2234497,14.0001831,5.9998169,14.223999,6,14.5V17H5c-1.1040039-0.0014038-1.9985962-0.8959961-2-2V8.5C3.0009155,7.671936,3.671936,7.0009155,4.5,7h2h11h0.0006104H19.5c0.828064,0.0009155,1.4990845,0.671936,1.5,1.5V15z"></path>
                    </svg>
                  </button>
                  <button className="more">···</button>
                </td>
              </tr>
            );
          })}
        </table>
        <div>
          <p>
            Showing 1-{totalCount} from {totalCount} data
          </p>
          <div className="pagination">
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastestInvoice;
