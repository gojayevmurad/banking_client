import { axiosClient } from ".";

const getCards = () => {
  return axiosClient.get("/api/cards/get");
};

const newCard = (body) => {
  return axiosClient.post("/api/cards/new-card", body);
};

export { getCards, newCard };
