import { axiosClient } from ".";

const getMessages = (params) => {
  return axiosClient.get("/api/messages/get-history", { params });
};

const reportMessage = (id) => {
  return axiosClient.delete(`/api/messages/report/${id}`);
};

export { getMessages, reportMessage };
