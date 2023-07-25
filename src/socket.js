import io from "socket.io-client";

const URL = "http://localhost:5000";

const token = JSON.parse(localStorage.getItem("user"))?.accessToken;

export const socket = io.connect(URL, {
  auth: {
    token: token,
  },
});
