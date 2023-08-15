import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { socket } from "../../socket";
import { toast } from "react-hot-toast";

import "./chat.scss";

import {
  getMessagesAsync,
  resetMessages,
  setNewMessageData,
  setReaded,
} from "../../redux/messages/messagesSlice";

const Chat = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const myId = useSelector((state) => state.profile.userInfoes.data?._id);
  const messages = useSelector((state) => state.messages.messages.data);
  const messagesLoading = useSelector(
    (state) => state.messages.messages.loading
  );
  const usersList = useSelector((state) => state.contacts.userContacts.data);

  // CHAT STATES
  const [activeChatId, setActiveChatId] = useState("");
  const [message, setMessage] = useState("");

  const changeActiveChatHandler = (id) => {
    activeChatId == id ? setActiveChatId("") : setActiveChatId(id);
  };

  const selectedPersonData =
    usersList && usersList.find((item) => item._id == activeChatId);

  const item = {
    isActive: true,
  };
  //#region messages readed

  const messagesReaded = (data) => {
    dispatch(setReaded({ id: data.id }));
  };

  //#endregion

  //#region send & recieve message

  const handleSendMessage = (e) => {
    e.preventDefault();
    socket.emit("send_message", { message, recipientId: activeChatId });

    const newMessage = {
      content: message,
      recipientId: activeChatId,
      senderId: myId,
      isReaded: true,
      date: Date.now(),
    };

    dispatch(setNewMessageData({ chatId: activeChatId, newMessage }));
    setMessage("");
  };

  const handleReceiveMessage = (data, activeChatId) => {
    const isEqual = (data1, data2) => {
      return data1 === data2;
    };
    const readedByMe = isEqual(data.userId, activeChatId);

    const newMessage = {
      senderId: data.userId,
      recipientId: myId,
      content: data.message,
      isReaded: false,
      date: Date.now(),
    };
    dispatch(setNewMessageData({ chatId: data.userId, newMessage }));
    if (readedByMe) socket.emit("readed", { connectionId: data.userId });
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

      if (!messages[activeChatId] || messages[activeChatId.length]) {
        dispatch(getMessagesAsync(toast, { contactId: activeChatId }));
      }

      socket.emit("readed", { connectionId: activeChatId });
    }
  }, [activeChatId]);

  useEffect(() => {
    if (activeChatId !== "" && messages[activeChatId]) {
      socket.emit("readed", { connectionId: activeChatId });
    }
  }, [messages]);

  //#endregion scroll down

  useEffect(() => {
    socket.on("receive_message", (data) => {
      handleReceiveMessage(data, activeChatId);
    });
    socket.on("readed", messagesReaded);
    return () => {
      socket.off("receive_message", (data) => {
        handleReceiveMessage(data, activeChatId);
      });
      socket.off("readed", messagesReaded);
    };
  }, [socket]);

  useEffect(() => {
    location.state && setActiveChatId(location.state.id);
    location.state &&
      dispatch(getMessagesAsync(toast, { contactId: activeChatId }));

    return () => {
      dispatch(resetMessages());
    };
  }, []);

  const getUnreadedMessagesCount = (id) => {
    if (messages && messages[id]) {
      let count = 0;
      messages[id].forEach((item) => {
        if (!item.isReaded) {
          count++;
        }
      });
      return count;
    } else {
      return 0;
    }
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
                        <img src={item.profile_photo} alt="" />
                      </div>
                      <div className="desc">
                        <p>{item.name + " " + item.surname}</p>
                        <span>{item.email}</span>
                      </div>
                    </div>
                    <div className="details">
                      <p>12:45 PM</p>
                      <span>{getUnreadedMessagesCount(item._id)}</span>
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
                    <img src={selectedPersonData.profile_photo} alt="" />
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
              <div
                data-loading={messagesLoading}
                className="active_chat--messages"
              >
                {myId &&
                  messages[activeChatId] &&
                  messages[activeChatId].map((message, index) => {
                    const fromContact = !(message.senderId == myId);
                    return (
                      <div
                        key={index}
                        className={
                          fromContact
                            ? "contact-message message"
                            : "your-message message"
                        }
                      >
                        <p>
                          {message.content}
                          {!fromContact &&
                            (message.isReaded ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="19"
                                height="19"
                                fill="none"
                                viewBox="0 0 24 24"
                                id="check"
                              >
                                <path
                                  stroke="#fff"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M16 8L8.70711 15.2929C8.31658 15.6834 7.68342 15.6834 7.29289 15.2929L4 12"
                                ></path>
                                <path
                                  stroke="#fff"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M22 8L14.7071 15.2929C14.3166 15.6834 13.6834 15.6834 13.2929 15.2929L11 13"
                                ></path>
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="15"
                                viewBox="0 0 96 96"
                                id="check"
                                fill="#fff"
                              >
                                <switch>
                                  <g>
                                    <path d="M36 76a3.999 3.999 0 0 1-2.828-1.171l-24-24.001a4 4 0 1 1 5.656-5.656L36 66.344l45.172-45.172a4 4 0 1 1 5.656 5.657l-48 48A3.999 3.999 0 0 1 36 76z"></path>
                                  </g>
                                </switch>
                              </svg>
                            ))}
                        </p>
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
