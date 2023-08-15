import React, { useEffect } from "react";
import { loginAsync } from "../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import "./login.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");

  const loginLoading = useSelector((state) => state.auth.login.loading);

  useEffect(() => {
    if (auth) {
      window.location.replace("/");
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    if (!email.trim().length || !password.trim().length) {
      return toast.error("Formu doldurun");
    }

    dispatch(loginAsync({ email, password }, navigate, toast));
  };

  return (
    <div className="login-page">
      <div className="wrapper">
        <aside>
          <h3 className="logo">Tagih</h3>
          <div className="content">
            <p>Welcome</p>
            <span>Sign in to continue access</span>
          </div>
        </aside>
        <form onSubmit={submitHandler}>
          <h4>Sign In</h4>
          <label>
            <p>Email Address</p>
            <input type="text" name="email" />
          </label>
          <label>
            <p>Password</p>
            <input type="password" name="password" />
          </label>
          <button disabled={loginLoading} type="submit">
            <p>CONTINUE</p>
          </button>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="register_btn"
          >
            Don't have an account?
          </button>
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="reset_password_btn"
          >
            Forgot password?
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
