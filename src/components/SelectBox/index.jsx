import React, { useEffect, useState } from "react";
import "./selectBox.scss";

const SelectBox = ({ option, options, setOption, setId }) => {
  const [active, setActive] = useState(false);

  const changeOptionHandler = (option) => {
    if (!option._id) {
      setActive(false);
      setOption(option);
    } else {
      setActive(false);
      setOption(option.fieldName);
      setId(option._id);
    }
  };

  useEffect(() => {
    setOption(options[0]);
    if (typeof options[0] == "object") {
      setId(options[0]._id);
    }
  }, [options.length]);

  return (
    <div className={active ? "active" : ""} id="selectbox">
      <p className="active_option" onMouseDown={() => setActive(!active)}>
        <span>{typeof option == "object" ? option.fieldName : option}</span>
        <i className="fa-solid fa-chevron-up"></i>
      </p>
      <div className="selectbox--list">
        {options.map((option, index) => {
          return (
            <div
              className="selectbox--item"
              key={index}
              onMouseDown={() => changeOptionHandler(option)}
            >
              {option._id ? option.fieldName : option}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectBox;
