import { axiosClient } from ".";

const getUserInfoes = () => {
  return axiosClient.get("/api/user/infoes");
};

const changeProfilePhoto = (data) => {
  return axiosClient.put("/api/user/change-profile-photo", data);
};

export { getUserInfoes, changeProfilePhoto };
