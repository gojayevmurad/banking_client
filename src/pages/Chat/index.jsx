import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { socket } from "../../socket";

import "./chat.scss";

const Chat = () => {
  const location = useLocation();

  const [activeChatId, setActiveChatId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState({});

  const usersList = useSelector((state) => state.contacts.userContacts.data);

  const changeActiveChatHandler = (id) => {
    activeChatId == id ? setActiveChatId("") : setActiveChatId(id);
  };

  const selectedPersonData =
    usersList && usersList.find((item) => item._id == activeChatId);

  const item = {
    isActive: true,
  };
  //#region send & recieve message

  const handleSendMessage = (e) => {
    e.preventDefault();
    socket.emit("send_message", { message, recepientId: activeChatId });

    const newMessage = {
      content: message,
      fromFriend: false,
      date: Date.now(),
    };

    setMessages((prevMessages) => ({
      ...prevMessages,
      [activeChatId]: [...(prevMessages[activeChatId] || []), newMessage],
    }));
    setMessage("");
  };

  const handleReceiveMessage = (data) => {
    const newMessage = {
      fromFriend: true,
      content: data.message,
      date: Date.now(),
    };
    setMessages((prevMessages) => ({
      ...prevMessages,
      [data.userId]: [...(prevMessages[data.userId] || []), newMessage],
    }));
  };
  //#endregion send & recieve message

  //#region scroll down
  useEffect(() => {
    const listItem = document.querySelector(".active_chat--messages");
    if (listItem) {
      listItem.scrollTop = listItem.scrollHeight + 38;
    }
  }, [messages]);

  useEffect(() => {
    if (activeChatId) {
      const listItem = document.querySelector(".active_chat--messages");
      if (listItem) {
        listItem.scrollTop = listItem.scrollHeight + 38;
      }
    }
  }, [activeChatId]);
  //#endregion scroll down

  useEffect(() => {
    socket.on("receive_message", handleReceiveMessage);
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket]);

  useEffect(() => {
    location.state && setActiveChatId(location.state.id);
  }, []);

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
              usersList.map((item, index) => {
                return (
                  <button
                    data-active={activeChatId == item._id ? true : false}
                    onClick={() => changeActiveChatHandler(item._id)}
                    className="users_list--content__item"
                    key={index}
                  >
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
                    <div className="details">
                      <p>12:45 PM</p>
                      <span>2</span>
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
        {activeChatId.trim().length != 0 ? (
          <div className="active_chat">
            <>
              <div className="active_chat--head">
                <div className="active_chat--head__data">
                  <div className="img">
                    <img
                      src="https://www.realmeye.com/forum/uploads/default/optimized/3X/1/d/1d423de54aa8e5836c8fee9d038bf81f44c63b98_1_500x500.jpg"
                      alt=""
                    />
                  </div>
                  <div className="desc">
                    <p>
                      {selectedPersonData.name +
                        " " +
                        selectedPersonData.surname}
                    </p>
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
                {messages[activeChatId] &&
                  messages[activeChatId].map((message, index) => {
                    return (
                      <div
                        key={index}
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
            </>
            <div className="active_chat--new">
              <form onSubmit={handleSendMessage}>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Göndər</button>
              </form>
            </div>
          </div>
        ) : (
          <div className="unactive_chat">Seçim edin</div>
        )}
      </div>
    </div>
  );
};

export default Chat;
