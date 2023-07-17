import { axiosClient } from ".";

const getUserInfoes = () => {
  return axiosClient.get("/api/user/infoes");
};

export { getUserInfoes };
