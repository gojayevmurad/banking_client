import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import profileSlice from "./profile/profileSlice";
import cardsSlice from "./cards/cardsSlice";
import transactionsSlice from "./transactions/transactionsSlice";
import contactsSlice from "./contacts/contactsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
    cards: cardsSlice,
    transactions: transactionsSlice,
    contacts: contactsSlice,
  },
});
