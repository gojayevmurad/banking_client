import React from "react";
import "./checkbox.scss";

const Checkbox = ({ value, setValue, loading }) => {
  const onClickHandler = () => {
    setValue(!value);
  };
  return (
    <button
      disabled={loading}
      onClick={onClickHandler}
      data-active={value}
      id="checkbox"
    >
      {!loading && value && <p>On</p>}
      <div className="circle"></div>
      {!loading && !value && <p>Off</p>}
    </button>
  );
};

export default Checkbox;
