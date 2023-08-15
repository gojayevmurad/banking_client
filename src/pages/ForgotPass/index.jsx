import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import "./forgotPassword.scss";
import { sendRecoveryEmailAsync } from "../../redux/auth/authSlice";

const ForgotPass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const btnLoading = useSelector((state) => state.auth.forgotPassword.loading);

  const auth = localStorage.getItem("user");

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (auth) {
      window.location.replace("/");
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!email.trim().length) {
      return toast.error("Emaili daxil edin");
    }

    dispatch(sendRecoveryEmailAsync(toast, navigate, { email }));
  };

  return (
    <div className="reset_pass_page">
      <div className="wrapper">
        <aside>
          <h3 className="logo">Tagih</h3>
          <div className="content">
            <p>Welcome</p>
            <span>Reset to continue access</span>
          </div>
        </aside>
        <form onSubmit={submitHandler}>
          <h4>Forgot Password</h4>
          <label>
            <p>Email Address</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              name="email"
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

export default ForgotPass;
