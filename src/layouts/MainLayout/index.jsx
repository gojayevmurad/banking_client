import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

import "./mainLayout.scss";
import SideBar from "../../components/SideBar";
import Navigation from "../../components/Navigation";

import { getUserInfoesAsync } from "../../redux/profile/profileSlice";
import { getCardsAsync } from "../../redux/cards/cardsSlice";

const MainLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfoesAsync(toast));
    dispatch(getCardsAsync(toast))
  }, []);

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
