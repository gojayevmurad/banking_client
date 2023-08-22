import { axiosClient } from ".";

const getUserInfoes = () => {
  return axiosClient.get("/api/user/infoes");
};

const changeProfilePhoto = (data) => {
  return axiosClient.put("/api/user/change-profile-photo", data);
};

const changeNotification = (data) => {
  return axiosClient.put("/api/user/change-notification");
};

export { getUserInfoes, changeProfilePhoto, changeNotification };
