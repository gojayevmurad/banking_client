import React, { useState } from "react";
import { useSelector } from "react-redux";

import "./chat.scss";

const Chat = () => {
  const [activeChatId, setActiveChatId] = useState("");
  const usersList = useSelector((state) => state.contacts.userContacts.data);

  const item = {
    name: "Murad",
    surname: "Gojayev",
    email: "muradgojayev@gmail.com",
    isActive: true,
    messages: [
      {
        content: "Salam.",
        fromFriend: true,
        date: "12:45 PM",
      },
      {
        content: "Salam.",
        fromFriend: false,
        date: "12:45 PM",
      },
    ],
  };

  return (
    <div className="messages_page">
      <div className="messages_page--header">
        <h3>Messages</h3>
      </div>
      <div className="content">
        <div className="users_list">
          <form className="users_list--header">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 101 101"
                id="search"
                height={24}
                width={24}
              >
                <path d="M63.3 59.9c3.8-4.6 6.2-10.5 6.2-17 0-14.6-11.9-26.5-26.5-26.5S16.5 28.3 16.5 42.9 28.4 69.4 43 69.4c6.4 0 12.4-2.3 17-6.2l20.6 20.6c.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7.9-.9.9-2.5 0-3.4L63.3 59.9zm-20.4 4.7c-12 0-21.7-9.7-21.7-21.7s9.7-21.7 21.7-21.7 21.7 9.7 21.7 21.7-9.7 21.7-21.7 21.7z"></path>
              </svg>
              <input type="text" />
            </div>
            <button type="submit">+</button>
          </form>
          <div className="users_list--content">
            {usersList &&
              usersList.map((item) => {
                return (
                  <div className="users_list--content__item">
                    <div>
                      <div className="img">
                        <img
                          src="https://www.realmeye.com/forum/uploads/default/optimized/3X/1/d/1d423de54aa8e5836c8fee9d038bf81f44c63b98_1_500x500.jpg"
                          alt=""
                        />
                      </div>
                      <div className="desc">
                        <p>{item.name + " " + item.surname}</p>
                        <span>{item.email}</span>
                      </div>
                    </div>
                    <div>
                      <p>12:45 PM</p>
                      <span>2</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="active_chat">
          <div className="active_chat--head">
            <div className="active_chat--head__data">
              <div className="img">
                <img
                  src="https://www.realmeye.com/forum/uploads/default/optimized/3X/1/d/1d423de54aa8e5836c8fee9d038bf81f44c63b98_1_500x500.jpg"
                  alt=""
                />
              </div>
              <div className="desc">
                <p>{item.name + " " + item.surname}</p>
                <span className={item.isActive ? "online" : "offline"}>
                  {item.isActive ? "Online" : "Offline"}
                </span>
              </div>
            </div>
            <div className="active_chat--head__actions">
              <button className="more">•••</button>
            </div>
          </div>
          <div data-loading={false} className="active_chat--messages">
            {item.messages.map((message) => {
              return (
                <div
                  className={
                    message.fromFriend
                      ? "contact-message message"
                      : "your-message message"
                  }
                >
                  <p>{message.content}</p>
                </div>
              );
            })}
          </div>
          <div className="active_chat--new">
            <form>
              <input type="text" />
              <button type="submit">Göndər</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
