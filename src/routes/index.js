import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import Balance from "../pages/Balance";
import Cards from "../pages/Cards";
import Transaction from "../pages/Transaction";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Contacts from "../pages/Contacts";
import Chat from "../pages/Chat";
import PrivateRoute from "./PrivateRoute";

import TransactionHistory from "../pages/Transaction/TransactionHistory";
import TransactionDetail from "../pages/Transaction/TransactionDetail";
import ForgotPass from "../pages/ForgotPass";
import PasswordReset from "../pages/PasswordReset";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    auth: true,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "balance",
        element: <Balance />,
      },
      {
        path: "cards",
        element: <Cards />,
      },
      {
        path: "transaction",
        element: <Transaction />,
        children: [
          {
            index: true,
            element: <TransactionHistory />,
          },
          {
            path: "detail/:id",
            element: <TransactionDetail />,
          },
        ],
      },
      {
        path: "contacts",
        element: <Contacts />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "chat",
        element: <Chat />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPass />,
  },
  {
    path: "/reset-password/:id/:token",
    element: <PasswordReset />,
  },
];
const authMap = (routes) => {
  return routes.map((route) => {
    if (route?.auth) {
      route.element = <PrivateRoute>{route.element}</PrivateRoute>;
    }
    if (route?.children) {
      route.children = authMap(route.children);
    }
    return route;
  });
};

export default authMap(routes);
