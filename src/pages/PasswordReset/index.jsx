import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import "./passwordReset.scss";
import {
  checkValidUserAsync,
  resetPasswordAsync,
  sendRecoveryEmailAsync,
} from "../../redux/auth/authSlice";
import Loading from "../../components/Loading";

const PasswordReset = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, token } = useParams();

  const btnLoading = useSelector((state) => state.auth.resetPassword.loading);
  const checkingValidUser = useSelector(
    (state) => state.auth.checkValidUser.loading
  );

  const auth = localStorage.getItem("user");

  const [password, setPassword] = useState({
    password: "",
    repeatPassword: "",
  });

  useEffect(() => {
    if (auth) {
      window.location.replace("/");
    }
    dispatch(checkValidUserAsync(toast, navigate, id));
  }, []);

  if (checkingValidUser) {
    return <Loading />;
  }

  const onChangeHandler = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (password.password !== password.repeatPassword) {
      toast.error("Şifrələr eyni olmalıdır");
    }
    dispatch(
      resetPasswordAsync(toast, navigate, {
        id,
        token,
        password: password.password,
      })
    );
  };

  return (
    <div className="forgot_pass_page">
      <div className="wrapper">
        <aside>
          <h3 className="logo">Tagih</h3>
          <div className="content">
            <p>Welcome</p>
            <span>Reset to continue access</span>
          </div>
        </aside>
        <form onSubmit={onSubmitHandler}>
          <h4>Reset Password</h4>
          <label>
            <p>new password</p>
            <input
              type="password"
              name="password"
              onChange={onChangeHandler}
              value={password.password}
            />
          </label>
          <label>
            <p>repeat new password</p>
            <input
              type="password"
              name="repeatPassword"
              onChange={onChangeHandler}
              value={password.repeatPassword}
            />
          </label>
          <button disabled={btnLoading} type="submit">
            <p>SUBMIT</p>
          </button>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="have_account_btn"
          >
            Have an account?
          </button>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="register_btn"
          >
            Don't have an account?
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
