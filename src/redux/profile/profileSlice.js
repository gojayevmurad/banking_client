import { createSlice } from "@reduxjs/toolkit";
import { changeProfilePhoto, getUserInfoes } from "../../api/profile";

const initialState = {
  userInfoes: {
    loading: false,
    data: null,
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUserInfoes: (state, action) => {
      state.userInfoes = {
        ...state.userInfoes,
        ...action.payload,
      };
    },
  },
});

export const getUserInfoesAsync = (toast) => async (dispatch) => {
  dispatch(setUserInfoes({ loading: true }));
  try {
    const response = await getUserInfoes();
    response && dispatch(setUserInfoes({ data: response.data }));
  } catch (err) {
    toast.error(err.message);
  }
  dispatch(setUserInfoes({ loading: false }));
};

export const changeProfilePhotoAsync = (toast, data) => async (dispatch) => {
  dispatch(setUserInfoes({ loading: true }));
  try {
    const response = await changeProfilePhoto(data);
    response && dispatch(setUserInfoes({ data: response.data }));
    response && toast.success(response.message);
  } catch (err) {
    toast.error(err.message);
  }
  dispatch(setUserInfoes({ loading: false }));
};

export const { setUserInfoes } = profileSlice.actions;

export default profileSlice.reducer;
