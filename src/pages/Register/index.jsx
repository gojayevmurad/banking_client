import React, { useState } from "react";
import { loginAsync, registerAsync } from "../../redux/auth/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import "./register.scss";
import UploadImage from "../../components/UploadImage";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [image, setImage] = useState();
  const [registerData, setRegisterData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const submitHandler = (e) => {
    const form = e.target;

    e.preventDefault();

    dispatch(registerAsync({ ...registerData, ...image }, navigate, toast));
  };

  const onChangeHandler = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-page">
      <form onSubmit={submitHandler}>
        <input
          onChange={onChangeHandler}
          type="text"
          placeholder="email"
          name="email"
        />
        <input
          onChange={onChangeHandler}
          type="text"
          placeholder="name"
          name="name"
        />
        <input
          onChange={onChangeHandler}
          type="text"
          placeholder="surname"
          name="surname"
        />
        <input
          onChange={onChangeHandler}
          type="password"
          placeholder="password"
          name="password"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <UploadImage />
        <button type="submit">Daxil ol</button>
      </form>
    </div>
  );
};

export default Register;
