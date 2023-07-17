import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import Balance from "../pages/Balance";
import Invoices from "../pages/Invoices";
import Cards from "../pages/Cards";
import Transaction from "../pages/Transaction";
import Settings from "../pages/Settings";
import Login from "../layouts/Login";
import PrivateRoute from "./PrivateRoute";

import TransactionHistory from "../pages/Transaction/TransactionHistory";
import TransactionDetail from "../pages/Transaction/TransactionDetail";

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
        path: "invoices",
        element: <Invoices />,
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
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
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
