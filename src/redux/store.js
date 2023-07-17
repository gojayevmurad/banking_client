import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import profileSlice from "./profile/profileSlice";
import cardsSlice from "./cards/cardsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
    cards: cardsSlice,
  },
});
