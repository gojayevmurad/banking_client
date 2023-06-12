import React from "react";
import { Outlet } from "react-router-dom";

import "./mainLayout.scss";
import SideBar from "../../components/SideBar";
import Navigation from "../../components/Navigation";

const MainLayout = () => {
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
