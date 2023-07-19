import { createSlice } from "@reduxjs/toolkit";
import {
  acceptTransaction,
  getPendingTransactions,
  getTransactionsHistory,
  rejectTransaction,
  setNewTransaction,
} from "../../api/transactions";

const initialState = {
  rejectingTransaction: {
    loading: false,
    data: null,
  },
  acceptingTransaction: {
    loading: false,
    data: null,
  },
  transactionHistory: {
    loading: false,
    data: null,
  },
  newTransaction: {
    loading: false,
    data: null,
  },
  pendingTransactions: {
    loading: false,
    data: null,
  },
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setRejectingTransactionData: (state, action) => {
      state.rejectingTransaction = {
        ...state.rejectingTransaction,
        ...action.payload,
      };
    },
    setAcceptingTransactionsData: (state, action) => {
      state.acceptingTransaction = {
        ...state.acceptingTransaction,
        ...action.payload,
      };
    },
    setTransactionsHistoryData: (state, action) => {
      state.transactionHistory = {
        ...state.transactionHistory,
        ...action.payload,
      };
    },
    setNewTransactionData: (state, action) => {
      state.newTransaction = {
        ...state.newTransaction,
        ...action.payload,
      };
    },
    setPendingTransactionData: (state, action) => {
      state.pendingTransactions = {
        ...state.pendingTransactions,
        ...action.payload,
      };
    },
  },
});

export const rejectTransactionAsync = (id, toast) => async (dispatch) => {
  dispatch(setRejectingTransactionData({ laoding: true }));
  try {
    const response = await rejectTransaction(id);
    response && setRejectingTransactionData({ data: response.data });
  } catch (err) {
    toast.error(err.message);
  }
  dispatch(setRejectingTransactionData({ laoding: false }));
};

export const getTransactionsHistoryAsync = (toast) => async (dispatch) => {
  setTransactionsHistoryData({ loading: true });
  try {
    const response = await getTransactionsHistory();
    response && dispatch(setTransactionsHistoryData({ data: response.data }));
  } catch (err) {
    toast.error(err.message);
  }
  setTransactionsHistoryData({ loading: false });
};

export const {
  setAcceptingTransactionsData,
  setNewTransactionData,
  setPendingTransactionData,
  setRejectingTransactionData,
  setTransactionsHistoryData,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
