import React from "react";
import "./checkbox.scss";

const Checkbox = ({ value, setValue }) => {
  const onClickHandler = () => {
    setValue(!value);
  };
  return (
    <button onClick={onClickHandler} id="checkbox">
      {value && <p>On</p>}
      <div className="circle"></div>
      {!value && <p>Off</p>}
    </button>
  );
};

export default Checkbox;
