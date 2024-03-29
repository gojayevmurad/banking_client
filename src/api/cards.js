import { axiosClient } from ".";

const getCards = () => {
  return axiosClient.get("/api/cards/get");
};

const newCard = (body) => {
  return axiosClient.post("/api/cards/new-card", body);
};

const changeCardStatus = (id) => {
  return axiosClient.put(`/api/cards/change-status/${id}`);
};

const changeCardLimit = (id) => {
  return axiosClient.put(`/api/cards/change-limit/${id}`);
};

const setLimit = (data) => {
  return axiosClient.post("/api/cards/set-limit", data);
};

export { getCards, newCard, changeCardStatus, changeCardLimit, setLimit };
