import { createSlice } from "@reduxjs/toolkit";
import { getCards } from "../../api/cards";

const initialState = {
  cards: {
    loading: false,
    data: null,
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

export const { setCardsData } = cardsSlice.actions;

export default cardsSlice.reducer;
