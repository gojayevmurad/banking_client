import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { registerAsync, verifyEmailAsync } from "../../redux/auth/authSlice";

import "./register.scss";
import OtpVerification from "../../components/Otp";
import { validationSchema } from "../../utils";

const date = new Date();
const today = `${date.getFullYear() - 18}-${
  date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
}-${date.getDate()}`;

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = localStorage.getItem("user");

  const [searchParams] = useSearchParams();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [formDatas, setFormDatas] = useState({
    name: "",
    surname: "",
    email: "",
    birthday: "",
    password: "",
    rePassword: "",
  });
  const [step, setStep] = useState(0);

  const otpStep = useSelector((state) => state.auth.register.otpStep);
  const registerLoading = useSelector((state) => state.auth.register.loading);
  const verifyingLoading = useSelector(
    (state) => state.auth.verificationEmail.loading
  );

  useEffect(() => {
    setStep(3);
  }, [otpStep]);

  useEffect(() => {
    setStep(1);
    if (auth) {
      window.location.replace("/");
    }
  }, []);

  useEffect(() => {
    if (searchParams.get("id")) {
      setStep(3);
    }
  }, [searchParams]);

  const formOnChange = (e) => {
    setFormDatas({ ...formDatas, [e.target.name]: e.target.value });
  };

  const onSubmitForm = () => {
    if (!formDatas.email.trim().length || !formDatas.password.trim().length) {
      return toast.error("Formu doldurun");
    }

    if (formDatas.password !== formDatas.rePassword) {
      return toast.error("Şifrələr eyni deyil");
    }

    for (const validate of validationSchema) {
      if (!validate.re.test(formDatas.password)) {
        toast.error(validate.message);
        return;
      }
    }

    const data = {
      name: formDatas.name.trim(),
      surname: formDatas.surname.trim(),
      email: formDatas.email.trim(),
      password: formDatas.password.trim(),
    };

    dispatch(registerAsync(data, navigate, toast));
  };

  const verificateAccount = () => {
    const OTP_CODE = otp.join("");
    if (OTP_CODE.trim().length < 6) {
      return toast.error("Xətalı kod");
    }

    const email = searchParams.get("id") || formDatas.email;

    dispatch(verifyEmailAsync(toast, navigate, { OTP: OTP_CODE, email }));
  };

  const setStepTwo = () => {
    if (!formDatas.name.trim().length || !formDatas.surname.trim().length) {
      return toast.error("Formu doldurun");
    }
    setStep(2);
  };

  return (
    <div className="register-page">
      <div className="wrapper">
        <aside>
          <h3 className="logo">Tagih</h3>
          <div className="content">
            <p>Welcome</p>
            <span>Register to continue access</span>
          </div>
        </aside>
        <form>
          <div className="steps-line">
            <div data-active={step > 1 ? "active" : ""} className="line-one">
              <div className="fill"></div>
            </div>
            <div data-active={step > 2 ? "active" : ""} className="line-two">
              <div className="fill"></div>
            </div>
          </div>
          <div className="steps">
            <div className={step >= 1 ? "active step" : "step"}>
              <div className="step--count">1</div>
              <p>User Details</p>
            </div>
            <div className={step >= 2 ? "active step" : "step"}>
              <div className="step--count">2</div>
              <p>Account Details</p>
            </div>
            <div className={step == 3 ? "active step" : "step"}>
              <div className="step--count">3</div>
              <p>Email Verification</p>
            </div>
          </div>
          <h4>Register</h4>
          <div className="step--forms">
            <div
              style={{
                transform: `translate(-${(step - 1) * 450}px, 0)`,
                opacity: [step == 1 ? 1 : 0],
              }}
              className="register_step_one"
            >
              <label>
                <p>Name</p>
                <input onChange={formOnChange} name="name" type="text" />
              </label>
              <label>
                <p>Surname</p>
                <input onChange={formOnChange} name="surname" type="text" />
              </label>
              <label className="birtday">
                <p>Birtday</p>
                <input
                  onChange={formOnChange}
                  name="birthday"
                  type="date"
                  max={today}
                />
              </label>
              <button type="button" onClick={setStepTwo}>
                <p>NEXT</p>
              </button>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="login_btn"
              >
                Have an account?
              </button>
            </div>
            <div
              className="register_step_two"
              style={{
                transform: `translate(-${(step - 1) * 450}px, 0)`,
                opacity: [step == 2 ? 1 : 0],
              }}
            >
              <label>
                <p>Email</p>
                <input onChange={formOnChange} name="email" type="email" />
              </label>
              <label>
                <p>Password</p>
                <input
                  onChange={formOnChange}
                  name="password"
                  type="password"
                />
              </label>
              <label>
                <p>repeat password</p>
                <input
                  onChange={formOnChange}
                  name="rePassword"
                  type="password"
                />
              </label>
              <button
                disabled={registerLoading}
                onClick={onSubmitForm}
                type="button"
              >
                <p>REGISTER</p>
              </button>
              <button onClick={() => setStep(1)} type="button">
                <p>Prev</p>
              </button>
            </div>
            <div
              className="register_step_three"
              style={{
                transform: `translate(-${(step - 1) * 450}px, 0)`,
                opacity: [step == 3 ? 1 : 0],
              }}
            >
              <label>
                <p>Email verification password</p>
                <div className="verification">
                  <OtpVerification otp={otp} setOtp={setOtp} />
                </div>
              </label>

              <button
                disabled={verifyingLoading}
                onClick={verificateAccount}
                type="button"
              >
                <p>CONFIRM</p>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
