import { createSlice } from "@reduxjs/toolkit";
import {
  acceptContact,
  getPendingContacts,
  getUserContacts,
  rejectContact,
  sendContactRequest,
} from "../../api/contacts";

const initialState = {
  userContacts: {
    loading: false,
    data: null,
  },
  acceptingContact: {
    loading: false,
  },
  rejectingContact: {
    loading: false,
  },
  pendingContacts: {
    loading: false,
    data: null,
  },
  sendRequest: {
    loading: false,
  },
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setUserContactsData: (state, action) => {
      state.userContacts = {
        ...state.userContacts,
        ...action.payload,
      };
    },
    setAcceptingContactData: (state, action) => {
      state.acceptingContact = {
        ...state.acceptingContact,
        ...action.payload,
      };
    },
    setRejectingContactData: (state, action) => {
      state.rejectingContact = {
        ...state.rejectingContact,
        ...action.payload,
      };
    },
    setPendingContactsData: (state, action) => {
      state.pendingContacts = {
        ...state.pendingContacts,
        ...action.payload,
      };
    },
    setSendRequestData: (state, action) => {
      state.sendRequest = {
        ...state.sendRequest,
        ...action.payload,
      };
    },
  },
});

export const getUserContactsAsync = (toast) => async (dispatch) => {
  dispatch(setUserContactsData({ loading: true }));
  try {
    const response = await getUserContacts();
    response && dispatch(setUserContactsData({ data: response.data }));
  } catch (err) {
    toast.error(err.message);
  }
  dispatch(setUserContactsData({ loading: false }));
};

export const sendContactRequestAsync = (toast, body) => async (dispatch) => {
  dispatch(setSendRequestData({ loading: true }));
  try {
    const response = await sendContactRequest(body);
    response.message && toast.success(response.message);
    response.data && dispatch(setUserContactsData({ data: response.data }));
    response.pendings &&
      dispatch(setPendingContactsData({ data: response.pendings }));
  } catch (err) {
    toast.error(err.message);
  }
  dispatch(setSendRequestData({ loading: false }));
};

export const getPendingContactsAsync = (toast) => async (dispatch) => {
  dispatch(setPendingContactsData({ loading: true }));
  try {
    const response = await getPendingContacts();
    response && dispatch(setPendingContactsData({ data: response.data }));
  } catch (err) {
    toast.error(err.message);
  }
  dispatch(setPendingContactsData({ loading: false }));
};

export const acceptContactAsync = (toast, id) => async (dispatch) => {
  dispatch(setAcceptingContactData({ loading: false }));
  try {
    const response = await acceptContact(id);
    response && dispatch(setUserContactsData({ data: response.data }));
    response && dispatch(setPendingContactsData({ data: response.pendings }));
  } catch (err) {
    toast.error(err.message);
  }
  dispatch(setAcceptingContactData({ loading: false }));
};

export const rejectContactAsync = (toast, id) => async (dispatch) => {
  dispatch(setRejectingContactData({ loading: true }));
  try {
    const response = await rejectContact(id);
    response && dispatch(setUserContactsData({ data: response.data }));
    response && dispatch(setPendingContactsData({ data: response.pendings }));
  } catch (err) {
    toast.error(err.message);
  }
  dispatch(setRejectingContactData({ loading: false }));
};

export const {
  setAcceptingContactData,
  setRejectingContactData,
  setUserContactsData,
  setPendingContactsData,
  setSendRequestData,
} = contactsSlice.actions;

export default contactsSlice.reducer;
