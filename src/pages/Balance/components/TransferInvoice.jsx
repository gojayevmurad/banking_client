import React, { useState } from "react";

const TransferInvoice = () => {
  const [userList, setUserList] = useState([
    {
      image:
        "https://www.realmeye.com/forum/uploads/default/optimized/3X/1/d/1d423de54aa8e5836c8fee9d038bf81f44c63b98_1_500x500.jpg",
      name: "Jordan",
    },
    {
      image:
        "https://www.realmeye.com/forum/uploads/default/optimized/3X/1/d/1d423de54aa8e5836c8fee9d038bf81f44c63b98_1_500x500.jpg",
      name: "Tony",
    },
    {
      image:
        "https://www.realmeye.com/forum/uploads/default/optimized/3X/1/d/1d423de54aa8e5836c8fee9d038bf81f44c63b98_1_500x500.jpg",
      name: "Karen",
    },
    {
      image:
        "https://www.realmeye.com/forum/uploads/default/optimized/3X/1/d/1d423de54aa8e5836c8fee9d038bf81f44c63b98_1_500x500.jpg",
      name: "Johnny",
    },
    {
      image:
        "https://www.realmeye.com/forum/uploads/default/optimized/3X/1/d/1d423de54aa8e5836c8fee9d038bf81f44c63b98_1_500x500.jpg",
      name: "Sariel",
    },
    {
      image:
        "https://www.realmeye.com/forum/uploads/default/optimized/3X/1/d/1d423de54aa8e5836c8fee9d038bf81f44c63b98_1_500x500.jpg",
      name: "John",
    },
    {
      image:
        "https://www.realmeye.com/forum/uploads/default/optimized/3X/1/d/1d423de54aa8e5836c8fee9d038bf81f44c63b98_1_500x500.jpg",
      name: "John",
    },
  ]);

  return (
    <div className="transfer_invoice">
      <h4>Transfer & Send Invoice</h4>
      <div className="transfer_invoice--list">
        {userList.map((item, index) => {
          if (index > 5) return;
          return (
            <div key={index} className="transfer_invoice--list__item">
              <div className="img">
                <img src={item.image} alt="user" />
              </div>
              <p>{item.name}</p>
            </div>
          );
        })}
        {userList.length > 6 && (
          <div className="more">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 96 96"
              id="arrow"
            >
              <switch>
                <g>
                  <path d="M12 52h62.344L53.172 73.172a4 4 0 1 0 5.657 5.656l28-28a4 4 0 0 0 0-5.656l-28-28A3.989 3.989 0 0 0 56 16a4 4 0 0 0-2.828 6.828L74.344 44H12a4 4 0 0 0 0 8z"></path>
                </g>
              </switch>
            </svg>
          </div>
        )}
      </div>
      <form>
        <label>
          <p>Recipient</p>
          <input type="text" placeholder="Insert recipient" />
        </label>
        <label>
          <p>Amount</p>
          <input type="number" placeholder="0.00" min={0} />
        </label>
        <div>
          <label>
            <input type="checkbox" />
            <span>Lorem ipsum dolor sit amet.</span>
          </label>
          <button type="submit">Transfer</button>
        </div>
      </form>
    </div>
  );
};

export default TransferInvoice;
