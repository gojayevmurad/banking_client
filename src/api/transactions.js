import { axiosClient } from ".";

const getTransactionsHistory = (params) => {
  return axiosClient.get("/api/transaction/get-history", { params });
};

const setNewTransaction = (body) => {
  return axiosClient.post("/api/transaction/send", body);
};

const getPendingTransactions = () => {
  return axiosClient.get("/api/transaction/get-pendings");
};

const acceptTransaction = (id) => {
  return axiosClient.put(`/api/transaction/accept/${id}`);
};

const rejectTransaction = (id) => {
  return axiosClient.put(`/api/transaction/reject/${id}`);
};

const getLastWeekTransactions = () => {
  return axiosClient.get("/api/transaction/last-week");
};

export {
  getTransactionsHistory,
  setNewTransaction,
  getPendingTransactions,
  rejectTransaction,
  acceptTransaction,
  getLastWeekTransactions,
};