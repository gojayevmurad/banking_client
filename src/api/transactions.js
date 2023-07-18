import { axiosClient } from ".";

const getTransactionsHistory = () => {
  return axiosClient.get("/api/transaction/get-history");
};

const setNewTransaction = (body) => {
  return axiosClient.post("/api/transaction/send", body);
};

const getPendingTransactions = () => {
  return axiosClient.get("/api/transaction/get-list");
};
