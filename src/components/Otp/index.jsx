import React, { useRef } from "react";

const OtpVerification = ({ otp, setOtp }) => {
  const otpInputs = useRef([]);

  const handleInputChange = (index, value) => {
    if (value.length > 0 && !(value == "0") && !Number(value)) {
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < otp.length - 1) {
      otpInputs.current[index + 1].focus();
    }
  };

  const handleInputKeyDown = (event, index) => {
    if (event.key === "Backspace" && index > 0 && otp[index] === "") {
      otpInputs.current[index - 1].focus();
    }
  };

  return (
    <>
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (otpInputs.current[index] = el)}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => handleInputKeyDown(e, index)}
          style={{ width: "30px", marginRight: "5px" }}
        />
      ))}
    </>
  );
};

export default OtpVerification;
