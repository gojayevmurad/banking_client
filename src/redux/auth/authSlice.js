import { createSlice } from "@reduxjs/toolkit";
import {
  changePassword,
  checkValidUser,
  login,
  register,
  resetPassword,
  sendRecoveryEmail,
  verifyEmail,
} from "../../api/auth";

const initialState = {
  register: {
    loading: false,
    otpStep: false,
  },
  login: {
    loading: false,
  },
  changePassword: {
    loading: false,
  },
  verificationEmail: {
    loading: false,
  },
  forgotPassword: {
    loading: false,
  },
  resetPassword: {
    loading: false,
  },
  checkValidUser: {
    loading: true,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRegisterData: (state, action) => {
      state.register = {
        ...state.register,
        ...action.payload,
      };
    },
    setLoginData: (state, action) => {
      state.login.loading = action.payload.loading;
    },
    setChangePasswordData: (state, action) => {
      state.changePassword.loading = action.payload.loading;
    },
    setVerificationEmail: (state, action) => {
      state.verificationEmail = {
        ...state.verificationEmail,
        ...action.payload,
      };
    },
    setForgotPasswordData: (state, action) => {
      state.forgotPassword = {
        ...state.forgotPassword,
        ...action.payload,
      };
    },

    setResetPasswordData: (state, action) => {
      state.resetPassword = {
        ...state.resetPassword,
        ...action.payload,
      };
    },
    setCheckValidUserData: (state, action) => {
      state.checkValidUser = {
        ...state.checkValidUser,
        ...action.payload,
      };
    },
  },
});

export const registerAsync = (data, navigate, toast) => async (dispatch) => {
  dispatch(setRegisterData({ loading: true }));
  try {
    const response = await register(data);
    response && dispatch(setRegisterData({ otpStep: true }));
    response && toast.success(response.message);
  } catch (error) {
    error && toast.error(error.message);
  }
  dispatch(setRegisterData({ loading: false }));
};

export const loginAsync = (data, navigate, toast) => async (dispatch) => {
  dispatch(setLoginData({ loading: true }));
  try {
    const response = await login(data);
    if (response) {
      localStorage.setItem("user", JSON.stringify(response.data));
      toast.success(response.message);
    }
    navigate("/");
  } catch (error) {
    error && toast.error(error.message);
    dispatch(setLoginData({ loading: false }));
  }
  // dispatch(setLoginData({ loading: false }));
};

export const changePasswordAsync = (toast, data) => async (dispatch) => {
  dispatch(setChangePasswordData({ loading: true }));
  try {
    const response = await changePassword(data);
    response && toast.success(response.message);
  } catch (error) {
    error && toast.error(error.message);
  }
  dispatch(setChangePasswordData({ loading: false }));
};

export const verifyEmailAsync = (toast, navigate, data) => async (dispatch) => {
  dispatch(setVerificationEmail({ loading: true }));
  try {
    const response = await verifyEmail(data);
    response && toast.success(response.message);
    response && navigate("/login");
  } catch (err) {
    toast.error(err.message);
  }
  dispatch(setVerificationEmail({ loading: false }));
};

export const sendRecoveryEmailAsync =
  (toast, navigate, data) => async (dispatch) => {
    dispatch(setForgotPasswordData({ loading: true }));
    try {
      const response = await sendRecoveryEmail(data);
      response && toast.success(response.message);
      response && navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
    dispatch(setForgotPasswordData({ loading: false }));
  };

export const resetPasswordAsync =
  (toast, navigate, data) => async (dispatch) => {
    dispatch(setResetPasswordData({ loading: true }));
    try {
      const response = await resetPassword(data);
      response && toast.success(response.message);
      response && navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
    dispatch(setResetPasswordData({ loading: false }));
  };

export const checkValidUserAsync =
  (toast, navigate, id) => async (dispatch) => {
    dispatch(setCheckValidUserData({ loading: true }));
    try {
      await checkValidUser(id);
    } catch (err) {
      toast.error(err.message);
      navigate("/not-found");
    }
    dispatch(setCheckValidUserData({ loading: false }));
  };

export const {
  setRegisterData,
  setLoginData,
  setChangePasswordData,
  setLoggedIn,
  setVerificationEmail,
  setForgotPasswordData,
  setResetPasswordData,
  setCheckValidUserData,
} = authSlice.actions;

export default authSlice.reducer;
