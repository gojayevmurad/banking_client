import React, { useState } from "react";
import "./selectBox.scss";

const SelectBox = ({ option, options, setOption }) => {
  const [active, setActive] = useState(false);
  const changeOptionHandler = (option) => {
    setActive(false);
    setOption(option);
  };
  return (
    <div className={active ? "active" : ""} id="selectbox">
      <p className="active_option" onMouseDown={() => setActive(!active)}>
        <span>{option}</span>
        <i class="fa-solid fa-chevron-up"></i>
      </p>
      <div className="selectbox--list">
        {options.map((option, index) => (
          <div
            className="selectbox--item"
            key={index}
            onMouseDown={() => changeOptionHandler(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectBox;
