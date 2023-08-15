import { createSlice } from "@reduxjs/toolkit";
import { getMessages } from "../../api/messages";

const initialState = {
  messages: {
    data: [],
    loading: false,
  },
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setNewMessageData: (state, action) => {
      const chatId = action.payload.chatId;
      const newMessage = action.payload.newMessage;

      state.messages.data = {
        ...state.messages.data,
        [chatId]: [...(state.messages.data[chatId] || []), newMessage],
      };
    },
    setMessagesHistoryData: (state, action) => {
      state.messages.data = {
        ...state.messages.data,
        ...action.payload,
      };
    },
    setMessagesHistoryLoading: (state, action) => {
      state.messages = {
        ...state.messages,
        ...action.payload,
      };
    },
    resetMessages: (state) => {
      state.messages.data = [];
    },
    setReaded: (state, action) => {
      if (state.messages.data[action.payload.id]) {
        const data = state.messages.data[action.payload.id].map((message) => {
          if (message.isReaded) {
            return message;
          } else {
            return {
              ...message,
              isReaded: true,
            };
          }
        });

        state.messages.data = {
          ...state.messages.data,
          [action.payload.id]: data,
        };
      }
    },
  },
});

export const getMessagesAsync = (toast, data) => async (dispatch) => {
  dispatch(setMessagesHistoryLoading({ loading: true }));
  try {
    const response = await getMessages(data);
    response &&
      dispatch(setMessagesHistoryData({ [response.contactId]: response.data }));
  } catch (err) {
    toast.error(err.message);
  }
  dispatch(setMessagesHistoryLoading({ loading: false }));
};

export const {
  setNewMessageData,
  setMessagesHistoryData,
  setMessagesHistoryLoading,
  resetMessages,
  setReaded,
} = messagesSlice.actions;

export default messagesSlice.reducer;
