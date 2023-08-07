import React from "react";
import { loginAsync } from "../../redux/auth/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import "./login.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    const form = e.target;

    e.preventDefault();

    dispatch(
      loginAsync(
        { email: form.email.value, password: form.password.value },
        navigate,
        toast
      )
    );
  };

  return (
    <div className="login-page">
      <form onSubmit={submitHandler}>
        <input type="text" name="email" />
        <input type="password" name="password" />
        <button type="submit">Daxil ol</button>
      </form>
    </div>
  );
};

export default Login;
