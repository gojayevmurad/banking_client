import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";

import "./mainLayout.scss";

import { socket } from "../../socket";

import SideBar from "../../components/SideBar";
import Navigation from "../../components/Navigation";

import { getUserInfoesAsync } from "../../redux/profile/profileSlice";
import { getCardsAsync } from "../../redux/cards/cardsSlice";
import {
  getPendingContactsAsync,
  getUserContactsAsync,
} from "../../redux/contacts/contactsSlice";
import {
  getLastTransactionsAsync,
  getLastWeekTransactionsAsync,
  getTransactionsHistoryAsync,
} from "../../redux/transactions/transactionsSlice";
import {
  getExpenseCategoriesAsync,
  getIncomeCategoriesAsync,
} from "../../redux/categories/categoriesSlice";

const MainLayout = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const showNotification = useSelector(
    (state) => state.profile.userInfoes?.data?.showNotification
  );

  const handleFocus = async () => {
    socket.emit("set_online");
  };

  const handleBlur = async () => {
    socket.emit("set_offline");
  };

  useEffect(() => {
    // #region get main data
    dispatch(getUserInfoesAsync(toast));
    dispatch(getCardsAsync(toast));
    dispatch(getUserContactsAsync(toast));
    dispatch(getLastWeekTransactionsAsync(toast));
    dispatch(getPendingContactsAsync(toast));
    dispatch(getTransactionsHistoryAsync(toast));
    dispatch(getLastTransactionsAsync(toast));
    dispatch(getExpenseCategoriesAsync(toast));
    dispatch(getIncomeCategoriesAsync(toast));
    //#endregion

    handleFocus();
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  const callNotification = (data) => {
    if (window.location.pathname != "/chat") {
      toast(
        (toastData) => (
          <div className="toast_notification">
            <div className="img">
              <img src={data.sender_photo} />
            </div>
            <div className="content">
              <span>{data.sender}</span>
              <p>{data.message}</p>
            </div>
            <button onClick={() => toast.dismiss(toastData.id)}>
              {t("dismiss")}
            </button>
          </div>
        ),
        {
          duration: 5000,
        }
      );
    }
  };

  useEffect(() => {
    socket.on("notification", callNotification);

    return () => {
      socket.off("notification", callNotification);
    };
  }, [socket]);

  useEffect(() => {
    !showNotification && socket.off("notification", callNotification);
    showNotification && socket.on("notification", callNotification);
  }, [showNotification]);

  return (
    <div className="main-layout">
      <div className="container">
        <div className="main-layout--content">
          <SideBar />
          <aside>
            <Navigation />
            <Outlet />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
