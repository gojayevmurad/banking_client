import { createSlice } from "@reduxjs/toolkit";
import {
  acceptTransaction,
  getLastWeekTransactions,
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
  },
  pendingTransactions: {
    loading: false,
    data: null,
  },
  lastWeek: {
    loading: false,
    data: null,
  },
  lastTransactions: {
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
    setLastWeekData: (state, action) => {
      state.lastWeek = {
        ...state.lastWeek,
        ...action.payload,
      };
    },
    setLastTransactionsData: (state, action) => {
      state.lastTransactions = {
        ...state.lastTransactions,
        ...action.payload,
      };
    },
  },
});

export const setNewTransactionAsync = (toast, body) => async (dispatch) => {
  dispatch(setNewTransactionData({ loading: true }));
  try {
    const response = await setNewTransaction(body);
    response && dispatch(setTransactionsHistoryData({ data: response.data }));
    response && toast.success(response.message);
  } catch (err) {
    toast.error(err.message);
  }
  dispatch(setNewTransactionData({ loading: false }));
};

export const rejectTransactionAsync = (toast, id) => async (dispatch) => {
  dispatch(setRejectingTransactionData({ laoding: true }));
  try {
    const response = await rejectTransaction(id);
    response && setRejectingTransactionData({ data: response.data });
  } catch (err) {
    toast.error(err.message);
  }
  dispatch(setRejectingTransactionData({ laoding: false }));
};

export const getTransactionsHistoryAsync =
  (toast, params) => async (dispatch) => {
    dispatch(setTransactionsHistoryData({ loading: true }));
    try {
      const response = await getTransactionsHistory(params);
      response && dispatch(setTransactionsHistoryData({ data: response.data }));
      response &&
        dispatch(setTransactionsHistoryData({ total: response.total }));
    } catch (err) {
      toast.error(err.message);
    }
    dispatch(setTransactionsHistoryData({ loading: false }));
  };

export const getPendingTransactionsAsync = (toast) => async (dispatch) => {
  dispatch(setPendingTransactionData({ loading: true }));
  try {
    const response = await getPendingTransactions();
    response && dispatch(setPendingTransactionData({ data: response.data }));
  } catch (err) {
    toast.error(err.message);
  }
  dispatch(setPendingTransactionData({ loading: false }));
};

export const acceptingTransactionAsync = (toast, id) => async (dispatch) => {
  dispatch(setAcceptingTransactionsData({ loading: true }));
  try {
    const response = await acceptTransaction(id);
    response && toast.success(response.message);
    dispatch(getPendingTransactionsAsync(toast));
    dispatch(getTransactionsHistoryAsync(toast));
  } catch (err) {
    toast.error(err.message);
  }
  dispatch(setAcceptingTransactionsData({ loading: false }));
};

export const getLastWeekTransactionsAsync = (toast) => async (dispatch) => {
  dispatch(setLastWeekData({ loading: true }));
  try {
    const response = await getLastWeekTransactions();
    response && dispatch(setLastWeekData({ data: response.data }));
  } catch (err) {
    toast.error(err.message);
  }
  dispatch(setLastWeekData({ loading: false }));
};

export const getLastTransactionsAsync = (toast) => async (dispatch) => {
  dispatch(setLastTransactionsData({ loading: true }));
  try {
    const response = await getTransactionsHistory({ page: 1, limit: 6 });
    response && dispatch(setLastTransactionsData({ data: response.data }));
  } catch (err) {
    toast.error(err.message);
  }
  dispatch(setLastTransactionsData({ loading: false }));
};

export const {
  setAcceptingTransactionsData,
  setNewTransactionData,
  setPendingTransactionData,
  setRejectingTransactionData,
  setTransactionsHistoryData,
  setLastWeekData,
  setLastTransactionsData,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
