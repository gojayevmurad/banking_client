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

export { register, login, changePassword };
