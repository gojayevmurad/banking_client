import { axiosClient } from ".";

const uploadImage = (data) => {
  return axiosClient.post("/uploadImage", data);
};

export { uploadImage };
