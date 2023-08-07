import React, { useState } from "react";
import "./navigation.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Navigation = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const contactNotification = useSelector(
    (state) => state.contacts.pendingContacts.data?.length
  );
  const userInfoes = useSelector((state) => state.profile.userInfoes.data);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    window.location.replace("/login");
  };

  return (
    <div className="navigation">
      <label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
        >
          <path
            fill="#200E32"
            d="M19.7555474,18.6065254 L16.3181544,15.2458256 L16.3181544,15.2458256 L16.2375905,15.1233001 C16.0877892,14.9741632 15.8829641,14.8901502 15.6691675,14.8901502 C15.4553709,14.8901502 15.2505458,14.9741632 15.1007444,15.1233001 L15.1007444,15.1233001 C12.1794834,17.8033337 7.6781476,17.94901 4.58200492,15.4637171 C1.48586224,12.9784243 0.75566836,8.63336673 2.87568494,5.31016931 C4.99570152,1.9869719 9.30807195,0.716847023 12.9528494,2.34213643 C16.5976268,3.96742583 18.4438102,7.98379036 17.2670181,11.7275931 C17.182269,11.9980548 17.25154,12.2921761 17.4487374,12.4991642 C17.6459348,12.7061524 17.9410995,12.794561 18.223046,12.7310875 C18.5049924,12.667614 18.7308862,12.4619014 18.8156353,12.1914397 L18.8156353,12.1914397 C20.2223941,7.74864367 18.0977423,2.96755391 13.8161172,0.941057725 C9.53449216,-1.08543846 4.38083811,0.250823958 1.68905427,4.08541671 C-1.00272957,7.92000947 -0.424820906,13.1021457 3.0489311,16.2795011 C6.5226831,19.4568565 11.8497823,19.6758854 15.5841278,16.7948982 L18.6276529,19.7705177 C18.9419864,20.0764941 19.4501654,20.0764941 19.764499,19.7705177 C20.0785003,19.4602048 20.0785003,18.9605974 19.764499,18.6502845 L19.764499,18.6502845 L19.7555474,18.6065254 Z"
            transform="translate(2 2)"
          ></path>
        </svg>
        <input
          type="text"
          placeholder="Search here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <div>
        <div className="navigation_actions">
          <button
            data-count={contactNotification}
            className={contactNotification ? "active" : ""}
            onClick={() => navigate("/contacts")}
          >
            <svg
              xmlns="http://www.w3.org/20100%00/svg"
              viewBox="0 0 32 32"
              id="friend"
              height={24}
              width={24}
            >
              <path d="M26.22,18.79a5,5,0,1,0-6.44,0,7,7,0,0,0-.65.38,9,9,0,0,0-4.32-4.31,7,7,0,1,0-7.63,0A9,9,0,0,0,2,23v6a1,1,0,0,0,1,1H29a1,1,0,0,0,1-1V25A7,7,0,0,0,26.22,18.79ZM20,15a3,3,0,1,1,3,3A3,3,0,0,1,20,15ZM6,9a5,5,0,1,1,5,5A5,5,0,0,1,6,9ZM17,28H4V23a7,7,0,0,1,14,0v5Zm11,0H20V23a9,9,0,0,0-.18-1.82A4.89,4.89,0,0,1,23,20a5,5,0,0,1,5,5Z"></path>
            </svg>
          </button>
          <button onClick={() => navigate("/chat")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="#200E32"
                d="M14.1972579,8.17124146e-14 C17.3979916,0.00978563072 19.990286,2.62120148 20,5.84554455 L20,5.84554455 L20,7.30693069 L19.99354,7.4036631 C19.9466817,7.75161611 19.6506049,8.01980198 19.2923485,8.01980198 L19.2923485,8.01980198 L19.2835029,8.0019802 L19.1721336,7.99309967 C19.0257158,7.96959451 18.889286,7.90013647 18.7831177,7.79318503 C18.6504073,7.65949573 18.5758514,7.47817413 18.5758514,7.28910891 L18.5758514,7.28910891 L18.5758514,5.84554455 C18.5518871,3.41954659 16.6054921,1.45879454 14.1972579,1.43465347 L14.1972579,1.43465347 L5.80274215,1.43465347 C3.39450789,1.45879454 1.44811291,3.41954659 1.42414861,5.84554455 L1.42414861,5.84554455 L1.42414861,12.1544554 C1.44811291,14.5804534 3.39450789,16.5412055 5.80274215,16.5653465 L5.80274215,16.5653465 L14.1972579,16.5653465 C16.6054921,16.5412055 18.5518871,14.5804534 18.5758514,12.1544554 C18.6163388,11.7890822 18.922975,11.5127474 19.2879257,11.5127474 C19.6528764,11.5127474 19.9595126,11.7890822 20,12.1544554 C19.990286,15.3787985 17.3979916,17.9902144 14.1972579,18 L14.1972579,18 L5.80274215,18 C2.599996,17.995093 0.00487110525,15.3808258 -1.42108547e-14,12.1544554 L-1.42108547e-14,12.1544554 L-1.42108547e-14,5.84554455 C-1.42108547e-14,2.61713944 2.59797615,8.17124146e-14 5.80274215,8.17124146e-14 L5.80274215,8.17124146e-14 Z M4.29443312,5.38692655 C4.48070099,5.36682207 4.6671823,5.42289927 4.81203008,5.54257426 L4.81203008,5.54257426 L8.96948253,8.85742574 C9.48880627,9.2678976 10.2192875,9.2678976 10.7386112,8.85742574 L10.7386112,8.85742574 L14.8518355,5.54257426 L14.8606811,5.54257426 L14.9473987,5.48291804 C15.2462388,5.30808809 15.6344967,5.37260085 15.8602388,5.64950495 C15.9785304,5.79800076 16.0329385,5.98799536 16.0113373,6.17714498 C15.9897361,6.36629461 15.8939207,6.53887938 15.7452455,6.65643564 L15.7452455,6.65643564 L11.6320212,9.98019802 C10.5861526,10.8280382 9.09540423,10.8280382 8.0495356,9.98019802 L8.0495356,9.98019802 L3.92746572,6.65643564 L3.8513546,6.58355583 C3.61891283,6.32594359 3.59998262,5.92999594 3.821318,5.64950495 C3.93770999,5.50163353 4.10816526,5.40703103 4.29443312,5.38692655 Z"
                transform="translate(2 3)"
              ></path>
            </svg>
          </button>
          <button onClick={() => navigate("/settings")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height={24}
              width={24}
              viewBox="0 0 24 24"
              id="equalizer"
            >
              <path d="M7,6H6V3A1,1,0,0,0,4,3V6H3A1,1,0,0,0,3,8H7A1,1,0,0,0,7,6ZM5,10a1,1,0,0,0-1,1V21a1,1,0,0,0,2,0V11A1,1,0,0,0,5,10Zm7,8a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V19A1,1,0,0,0,12,18Zm9-8H20V3a1,1,0,0,0-2,0v7H17a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2Zm-2,4a1,1,0,0,0-1,1v6a1,1,0,0,0,2,0V15A1,1,0,0,0,19,14Zm-5,0H13V3a1,1,0,0,0-2,0V14H10a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2Z"></path>
            </svg>
          </button>
        </div>
        <div className="user_detail">
          <div className="user_photo">
            <img src={userInfoes?.profile_photo} alt="" />
          </div>
          <p className="user_name">
            {userInfoes?.name + " " + userInfoes?.surname}
          </p>
          <div onMouseDown={logoutHandler} className="logout">
            Hesabdan çıxış
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
