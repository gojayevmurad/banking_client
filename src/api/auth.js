import { axiosClientFree, axiosClient } from ".";

const register = (data) => {
  return axiosClientFree.post("/api/user/register", data);
};

const login = (data) => {
  return axiosClientFree.post("/api/user/login", data);
};

const changePassword = (data) => {
  return axiosClient.put("/api/user/change-password", data);
};

const verifyEmail = (data) => {
  return axiosClientFree.put("/api/user/verify", data);
};

const sendRecoveryEmail = (data) => {
  return axiosClientFree.post("/api/user/send-recovery-email", data);
};

const resetPassword = (data) => {
  return axiosClientFree.put("/api/user/reset-password", data);
};

const checkValidUser = (id) => {
  return axiosClientFree.get(`/api/user/validuser/${id}`);
};

export {
  register,
  login,
  changePassword,
  verifyEmail,
  sendRecoveryEmail,
  resetPassword,
  checkValidUser,
};
