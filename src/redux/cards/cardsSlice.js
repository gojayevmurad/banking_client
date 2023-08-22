import { createSlice } from "@reduxjs/toolkit";
import {
  changeCardLimit,
  changeCardStatus,
  getCards,
  newCard,
  setLimit,
} from "../../api/cards";

const initialState = {
  cards: {
    loading: false,
    data: null,
  },
  newCard: {
    loading: false,
    data: null,
  },
  changeCardStatus: {
    loading: false,
  },
  changingLimit: {
    loading: false,
  },
  changingLimitTarget: {
    loading: false,
  },
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCardsData: (state, action) => {
      state.cards = {
        ...state.cards,
        ...action.payload,
      };
    },
    setNewCardData: (state, action) => {
      state.newCard = {
        ...state.newCard,
        ...action.payload,
      };
    },
    setChangeCardStatusData: (state, action) => {
      state.changeCardStatus = {
        ...state.changeCardStatus,
        ...action.payload,
      };
    },
    setChangingCardLimitData: (state, action) => {
      state.changingLimit = {
        ...state.changingLimit,
        ...action.payload,
      };
    },
    setChangingLimitTarget: (state, action) => {
      state.changingLimitTarget = {
        ...state.changingLimitTarget,
        ...action.payload,
      };
    },
  },
});

export const getCardsAsync = (toast) => async (dispatch) => {
  dispatch(setCardsData({ loading: true }));
  try {
    const response = await getCards();
    response && dispatch(setCardsData({ data: response.data }));
  } catch (err) {
    toast.error(err.message);
  }
  dispatch(setCardsData({ loading: false }));
};

export const newCardAsync = (toast, data) => async (dispatch) => {
  dispatch(setNewCardData({ loading: true }));
  try {
    const response = await newCard(data);
    response && dispatch(setCardsData({ data: response.data }));
    response && toast.success(response.message);
  } catch (err) {
    toast.error(err.message);
  }
  dispatch(setNewCardData({ loading: false }));
};

export const changeCardStatusAsync = (toast, id) => async (dispatch) => {
  dispatch(setChangeCardStatusData({ loading: true }));
  try {
    const response = await changeCardStatus(id);
    response && dispatch(setCardsData({ data: response.data }));
    response && toast.success(response.message);
  } catch (err) {
    toast.error(err.message);
  }
  dispatch(setChangeCardStatusData({ loading: false }));
};

export const changeCardLimitAsync = (toast, id) => async (dispatch) => {
  dispatch(setChangingCardLimitData({ loading: true }));
  try {
    const response = await changeCardLimit(id);
    response && dispatch(setCardsData({ data: response.data }));
    response && toast.success(response.message);
  } catch (err) {
    toast.error(err.message);
  }
  dispatch(setChangingCardLimitData({ loading: false }));
};

export const setLimitAsync = (toast, data) => async (dispatch) => {
  dispatch(setChangingLimitTarget({ loading: true }));
  try {
    const response = await setLimit(data);
    response && toast.success(response.message);
  } catch (err) {
    toast.error(err.message);
  }
  dispatch(setChangingLimitTarget({ loading: false }));
};

export const {
  setCardsData,
  setNewCardData,
  setChangeCardStatusData,
  setChangingCardLimitData,
  setChangingLimitTarget,
} = cardsSlice.actions;

export default cardsSlice.reducer;
